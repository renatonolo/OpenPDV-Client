import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'moneyPipe'})
export class MoneyPipe implements PipeTransform {
    transform(value: number): string {
        var first:string = null, second:string = null;
        var aux: Array<string> = [];
        var c:number = 0;
        var out = "";
        var val = value.toString();
        var dot: number = val.indexOf(".", 0);

        if(dot > 0){
            first = val.substring(0,dot);
            second = val.substring(dot+1,val.length);
        } else {
            first = val;
            second = "00";
        }

        if(second.length < 2) second = second + "0";
        else if(second.length > 2) second = second.substring(0, 2);

        if(first.length > 3){
            for(var j = first.length; j >= 0; j = j - 3){
                if((j - 3) < 0) aux[c] = first.substring(0, j);
                else aux[c] = first.substring(j - 3, j);
                c++;
            }

            for(var c = aux.length-1; c >= 0; c--){
                out += aux[c]+'.';
            }

            if(out.substring(0, 1) == '.') out = out.substring(1, out.length);
            if(out.substring(out.length-1, out.length) == '.') out = out.substring(0, out.length-1);
            if(out.substring(0, 1) == '-' && out.substring(1, 2) == '.') out = "-" + out.substring(2, out.length);
        } else out = first;

        out += ',' + second;

        return out;
    }
}
