import { HttpResponse } from '@angular/common/http';

export class Utils {
  public static tryParseDate(date: Date) {
    if (!!date) {
      return date.toISOString();
    }
    // return null;
    // Can't return null since URI will get 'null'
    return '';
  }

  public static tryParseNumber(number: number) {
    if (!!number) {
      return number.toString();
    }

    // return empty string so that encodeURIComponent won't turn it into a string literal 'null'
    return '';
  }

  public static getCookieValue(cookieName: string) {
    const allCookies = decodeURIComponent(document.cookie).split('; ');
    for (const element of allCookies) {
      const cookie = element;
      if (cookie.startsWith(cookieName + '=')) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return '';
  }

  public static setCookieValue(cookieName: string, cookieValue: string) {
    
  }

  public static getFileName(response: HttpResponse<Blob>) {
    let fileName: string;
    try {
      const contentDisposition = `${response.headers.get('Content-Disposition')}`;
      const r = /(?:filename=)(.+)(?:;)/;
      fileName = `${r.exec(contentDisposition) ? r.exec(contentDisposition)![1] : ''}`.replace(/\"/g, '');
    } catch (e) {
      fileName = 'file.txt';
    }
    return fileName;
  }

  public static getFileType(response: HttpResponse<Blob>) {
    const fileType = response.headers.get('Content-Type');
    return fileType;
  }

  public static removeNotDigitCharacters(str?: string): string | undefined {
    return str?.replace(/[^0-9]/g, '');
  }
}
