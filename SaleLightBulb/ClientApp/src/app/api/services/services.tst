${
    using Typewriter.Extensions.WebApi;
    Template(Settings settings)
    {
        settings.OutputFilenameFactory = file =>
        {
            var FinalFileName = file.Name.Replace("Controller", "");
            FinalFileName = FinalFileName.Replace(".cs", "");
            return $"{CamelCase(FinalFileName)}.service.ts";
        };
    }
    static string CamelCase(string s)
    {
      if (string.IsNullOrEmpty(s)) return s;
      if (char.IsUpper(s[0]) == false) return s;
      var chars = s.ToCharArray();
      chars[0] = char.ToLowerInvariant(chars[0]);
      return new string(chars);
    }
    // Change ApiController to Service
    string ServiceName(Class c) => c.Name.Replace("Controller", "ApiProxy");
    // Turn IActionResult into void
    string ReturnType(Method objMethod)
    {
        if(objMethod.Type.Name == "IActionResult")
        {
                if((objMethod.Parameters.Where(x => !x.Type.IsPrimitive).FirstOrDefault() != null))
                {
                    return objMethod.Parameters.Where(x => !x.Type.IsPrimitive).FirstOrDefault().Name;
                }
                else
                {
                    return "void";
                }
        }
        else if(objMethod.Type.Name == "FileResult")
        {
          return "{ blob: Blob, name: string, type: string }";
        }
        else
        {
                return objMethod.Type.Name;
        }
    }

    // Remove type when import generic
    string RemoveChild(string input) {
      var start = input.LastIndexOf("<");
      var end = input.LastIndexOf(">");
      if(start > 0 && end > 0) {
        return input.Remove(start, (end-start)+1);
      }
      return input;
    }

    // Get the non primitive paramaters so we can create the Imports at the
    // top of the service
    string ImportsList(Class objClass)
    {
      var ImportsOutputs = new List<(string, string)>();
        // Get the methods in the Class
        var objMethods = objClass.Methods;
        // Loop through the Methdos in the Class
        foreach(Method objMethod in objMethods)
        {
            // Loop through each Parameter in each method
            foreach(Parameter objParameter in objMethod.Parameters)
            {
                // If the Paramater is not prmitive we need to add this to the Imports
                if((!objParameter.Type.IsPrimitive || objParameter.Type.IsEnum) && objParameter.Type.name != "any" && objParameter.Type.Name != "IFormFile"){
                if (objParameter.Type.IsEnumerable)
                  {
                    ImportsOutputs.Add((objParameter.Type.name.TrimEnd('[',']'), objParameter.Type.Name.TrimEnd('[',']')));
                  }
                  else
                  {
                    ImportsOutputs.Add((RemoveChild(objParameter.Type.name), RemoveChild(objParameter.Type.Name)));
                    if(objParameter.Type.IsGeneric)
                    {
                      var type = objParameter.Type.TypeArguments.FirstOrDefault();
                      ImportsOutputs.Add((type.name, type.Name));
                    }
                  }
                }
            }

            if (objMethod.Type.Name != "void" && objMethod.Type.Name != "IActionResult" && !objMethod.Type.IsPrimitive && objMethod.Type.Name != "FileResult" && objMethod.Type.Name != "IFormFile")
            {
              if (objMethod.Type.IsEnumerable)
              {
                ImportsOutputs.Add((objMethod.Type.name.TrimEnd('[',']'), objMethod.Type.Name.TrimEnd('[',']')));
              }
              else
              {
                ImportsOutputs.Add((RemoveChild(objMethod.Type.name), RemoveChild(objMethod.Type.Name)));
                if(objMethod.Type.IsGeneric)
                {
                  var type = objMethod.Type.TypeArguments.FirstOrDefault();
                  ImportsOutputs.Add((type.name, type.Name));
                }
              }
            }

        }
        // Notice: As of now this will only return one import

        return string.Join("\r\n", ImportsOutputs.Distinct().Select(x => $"import {{ {x.Item2} }} from '../models/{x.Item1}';"));
    }
    // Format the method based on the return type
    string MethodFormat(Method objMethod)
    {
        var castingBlock = ReturnType(objMethod) == "{ blob: Blob, name: string, type: string }" ? string.Empty : $"<{ReturnType(objMethod)}>";
        var optionsBlock = ReturnType(objMethod) == "{ blob: Blob, name: string, type: string }" ? ", { headers: header, observe: 'response', responseType:'blob' }": ", { headers: header }";

        if(objMethod.HttpMethod() == "get"){
            return  $"{castingBlock}(url{optionsBlock})";
        }
        if(objMethod.HttpMethod() == "delete"){
            return  $"{castingBlock}(url{optionsBlock})";
        }

        var param = objMethod.Parameters.Where(p => p.Attributes.Any(a => a.Name == "FromBody" || a.Name == "FromForm")).FirstOrDefault()?.name;
        var buildedParam = !string.IsNullOrWhiteSpace(param)? $", {param}": ", null";
        if(objMethod.HttpMethod() == "post"){
            return  $"{castingBlock}(url{buildedParam}{optionsBlock})";
        }
        if(objMethod.HttpMethod() == "put"){
            return  $"{castingBlock}(url{buildedParam}{optionsBlock})";
        }

        return  $"";
    }

    string paramterType(Parameter param){
      if(param.Type.Name == "IFormFile"){
        return "any";
      }
      return param.Type;
    }

    string customUrl(Method objMethod)
    {
      var propList = new List<string>();
      if((objMethod.HttpMethod() == "get") && objMethod.Parameters.Count != 0) {
        foreach(var parameter in objMethod.Parameters.Where(x=>x.Attributes.All(a=>a.Name != "FromRoute"))) {
          if(!parameter.Type.IsDefined || parameter.Type.IsEnum) {
            propList.Add($"{CamelCase(parameter)}=${{encodeURIComponent({CamelCase(parameter)})}}");
          }
          else if(parameter.Type.IsDate) {
            propList.Add($"{CamelCase(parameter)}=${{encodeURIComponent({CamelCase(parameter)}.toISOString())}}");
          }
          else {
            foreach(var prop in parameter.Type.Properties) {
              if(prop.Type.IsDate){
                propList.Add($"{CamelCase(parameter.name)}.{prop.name}=${{encodeURIComponent(Utils.tryParseDate({CamelCase(parameter.name)}.{prop.name}))}}");
              }
              else if (prop.Type.IsEnum) {
                propList.Add($"{CamelCase(parameter.name)}.{prop.name}=${{encodeURIComponent(Utils.tryParseNumber({CamelCase(parameter.name)}.{prop.name}))}}");
              }
              else {
                propList.Add($"{CamelCase(parameter.name)}.{prop.name}=${{encodeURIComponent({CamelCase(parameter.name)}.{prop.name})}}");
              }
            }
          }
        }
        if(propList.Count > 0){
          return $"{objMethod.Url().Split('?')[0]}?{string.Join("&",propList)}";
        }

        return $"{objMethod.Url().Split('?')[0]}";
      }
      var url = objMethod.Url();
      while(url.StartsWith("/")){
        url = url.Remove(0,1);
      }
      return url;
    }

    string Pipes(Method objMethod) {
      var pipes = new List<string>();
      pipes.Add($"catchError(val => this.handleError(val))");

      if (ReturnType(objMethod) == "{ blob: Blob, name: string, type: string }") {
        pipes.Add($"map((response: HttpResponse<Blob>) => ({{ blob: response.body, name: Utils.getFileName(response), type: Utils.getFileType(response) }}))");
      }

      return string.Join(", ", pipes);
    }
}// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiConfiguration } from './api-configuration';
$Classes(:BaseController)[$ImportsList

@Injectable({
  providedIn: 'root'
})
export class $ServiceName {
  private server = '';
  constructor(private httpClient: HttpClient, private apiConfiguration: ApiConfiguration) {
    this.server = apiConfiguration.apiUrl;
  }
$Methods[
  // $HttpMethod: $Url
  // $RequestData
  // $Route
  public $name($Parameters[$name: $paramterType][, ]): Observable<$ReturnType> {
    const url = `${this.server}/$customUrl`;
    const header = { 'Authorization': 'Bearer ' + this.apiConfiguration.authenToken };
    return this.httpClient.$HttpMethod$MethodFormat.pipe($Pipes);
  }
]
  // Utility
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(error);
    let customError = '';
    if (error.error) {
      customError = error.error;
    }
    return throwError(() => customError || 'Server error');
  }
}]
