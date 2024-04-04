${
  using System.Collections;
  using System.Text;
  using IO = System.IO;
  using Typewriter.Extensions.Types;

  Template(Settings settings)
  {
    settings.OutputFilenameFactory = file => CamelCase(IO.Path.GetFileNameWithoutExtension(file.Name));
  }

  static string CamelCase(string s)
  {
      if (string.IsNullOrEmpty(s)) return s;
      if (char.IsUpper(s[0]) == false) return s;
      var chars = s.ToCharArray();
      chars[0] = char.ToLowerInvariant(chars[0]);
      return new string(chars);
  }

  IEnumerable<Property> InheritedProperties(Class @class)
  {
    while (@class != null)
    {
      foreach (var p in @class.Properties)
        yield return p;
      @class = @class.BaseClass;
    }
  }
private bool Visited(Type type, Dictionary<string, Type> set)
  {
    if (type.IsDefined && !set.ContainsKey(type.FullName))
    {
      set.Add(type.FullName, type);
      return true;
    }
    return false;
  }

  private void VisitTypes(Class @class, Dictionary<string, Type> set)
  {
    foreach (var p in InheritedProperties(@class))
    {
      var t = p.Type.Unwrap();
      Visited(t, set);
    }
  }

  static Dictionary<File, IEnumerable<Type>> DependenciesCache = new Dictionary<File, IEnumerable<Type>>();

  IEnumerable<Type> Dependencies(File file)
  {
    IEnumerable<Type> result;
    if (DependenciesCache.TryGetValue(file, out result)) return result;

    var set = new Dictionary<string, Type>();
    foreach (var @class in file.Classes)
      VisitTypes(@class, set);
    result = set.Values;

    DependenciesCache.Add(file, result);
    return result;
  }

  string GetTypeString(Type @type) {
    if (@type.IsNullable || @type.name == "string"){
      return @type.Name + " | null";
    }
    return @type.Name;
  }

  string GetPropertyName(Property p){
    if(p.Type.IsNullable || p.Type.name == "string"){
      return p.name + "?";
    }
    return p.name;
  }

  string ClassName(Class c) {
    var name = c.Name;
    var baseClass = "";
    if(c.IsGeneric){      
      name += c.TypeParameters;
    }
    if(c.BaseClass != null){
      baseClass = " extends " + c.BaseClass.Name;
      if(c.BaseClass.IsGeneric){
        baseClass += c.BaseClass.TypeArguments;
      }
    }

    name += baseClass;
    return name;
  }

  string BaseClassDependencies(Class c){
    if(c.BaseClass != null){
      return $"import {{ {c.BaseClass.Name} }} from './{c.BaseClass.name}'\r\n";
    }
    return "";
  }

  IEnumerable<Type> ClassDependencies(File file){
    var tps = file.Classes.SelectMany(x=>x.TypeParameters.Select(y=>y.Name).Concat(new []{x.Name})).ToArray();
    var types = Dependencies(file).Where(t=> !t.IsEnum && !tps.Contains(t.Name));
    return types;
  }

  IEnumerable<Type> EnumDependencies(File file) => Dependencies(file).Where(t => t.IsEnum);
}// ------------------------------------------------------------------------------------
// This file is auto-generated, don't modify it manually or your changes will be lost.
// ------------------------------------------------------------------------------------
$EnumDependencies[import { $Name } from './$name';
]$ClassDependencies[import { $Name } from './$name';
]$Classes(SaleLightBulb.Dtos*)[$BaseClassDependencies
export interface $ClassName {
$Properties[  $GetPropertyName: $Type[$Name];
]}
]$Enums(SaleLightBulb.Infrastructure.Domain.Enums.*)[
export enum $Name {
$Values[  $Name = $Value][,
]
}]
