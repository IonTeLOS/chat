var m,T;function Z(){if(T)return m;T=1,m=y,y.displayName="csharp",y.aliases=["dotnet","cs"];function y(z){(function(t){function r(n,u){return n.replace(/<<(\d+)>>/g,function(d,W){return"(?:"+u[+W]+")"})}function e(n,u,d){return RegExp(r(n,u),d||"")}function l(n,u){for(var d=0;d<u;d++)n=n.replace(/<<self>>/g,function(){return"(?:"+n+")"});return n.replace(/<<self>>/g,"[^\\s\\S]")}var s={type:"bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",typeDeclaration:"class enum interface record struct",contextual:"add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)",other:"abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield"};function p(n){return"\\b(?:"+n.trim().replace(/ /g,"|")+")\\b"}var w=p(s.typeDeclaration),g=RegExp(p(s.type+" "+s.typeDeclaration+" "+s.contextual+" "+s.other)),j=p(s.typeDeclaration+" "+s.contextual+" "+s.other),q=p(s.type+" "+s.typeDeclaration+" "+s.other),h=l(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source,2),b=l(/\((?:[^()]|<<self>>)*\)/.source,2),o=/@?\b[A-Za-z_]\w*\b/.source,f=r(/<<0>>(?:\s*<<1>>)?/.source,[o,h]),i=r(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source,[j,f]),v=/\[\s*(?:,\s*)*\]/.source,A=r(/<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source,[i,v]),N=r(/[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source,[h,b,v]),O=r(/\(<<0>>+(?:,<<0>>+)+\)/.source,[N]),c=r(/(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source,[O,i,v]),a={keyword:g,punctuation:/[<>()?,.:[\]]/},x=/'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source,E=/"(?:\\.|[^\\"\r\n])*"/.source,F=/@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;t.languages.csharp=t.languages.extend("clike",{string:[{pattern:e(/(^|[^$\\])<<0>>/.source,[F]),lookbehind:!0,greedy:!0},{pattern:e(/(^|[^@$\\])<<0>>/.source,[E]),lookbehind:!0,greedy:!0}],"class-name":[{pattern:e(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source,[i]),lookbehind:!0,inside:a},{pattern:e(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source,[o,c]),lookbehind:!0,inside:a},{pattern:e(/(\busing\s+)<<0>>(?=\s*=)/.source,[o]),lookbehind:!0},{pattern:e(/(\b<<0>>\s+)<<1>>/.source,[w,f]),lookbehind:!0,inside:a},{pattern:e(/(\bcatch\s*\(\s*)<<0>>/.source,[i]),lookbehind:!0,inside:a},{pattern:e(/(\bwhere\s+)<<0>>/.source,[o]),lookbehind:!0},{pattern:e(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source,[A]),lookbehind:!0,inside:a},{pattern:e(/\b<<0>>(?=\s+(?!<<1>>|with\s*\{)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source,[c,q,o]),inside:a}],keyword:g,number:/(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,operator:/>>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,punctuation:/\?\.?|::|[{}[\];(),.:]/}),t.languages.insertBefore("csharp","number",{range:{pattern:/\.\./,alias:"operator"}}),t.languages.insertBefore("csharp","punctuation",{"named-parameter":{pattern:e(/([(,]\s*)<<0>>(?=\s*:)/.source,[o]),lookbehind:!0,alias:"punctuation"}}),t.languages.insertBefore("csharp","class-name",{namespace:{pattern:e(/(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source,[o]),lookbehind:!0,inside:{punctuation:/\./}},"type-expression":{pattern:e(/(\b(?:default|sizeof|typeof)\s*\(\s*(?!\s))(?:[^()\s]|\s(?!\s)|<<0>>)*(?=\s*\))/.source,[b]),lookbehind:!0,alias:"class-name",inside:a},"return-type":{pattern:e(/<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source,[c,i]),inside:a,alias:"class-name"},"constructor-invocation":{pattern:e(/(\bnew\s+)<<0>>(?=\s*[[({])/.source,[c]),lookbehind:!0,inside:a,alias:"class-name"},"generic-method":{pattern:e(/<<0>>\s*<<1>>(?=\s*\()/.source,[o,h]),inside:{function:e(/^<<0>>/.source,[o]),generic:{pattern:RegExp(h),alias:"class-name",inside:a}}},"type-list":{pattern:e(/\b((?:<<0>>\s+<<1>>|record\s+<<1>>\s*<<5>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>|<<1>>\s*<<5>>|<<6>>)(?:\s*,\s*(?:<<3>>|<<4>>|<<6>>))*(?=\s*(?:where|[{;]|=>|$))/.source,[w,f,o,c,g.source,b,/\bnew\s*\(\s*\)/.source]),lookbehind:!0,inside:{"record-arguments":{pattern:e(/(^(?!new\s*\()<<0>>\s*)<<1>>/.source,[f,b]),lookbehind:!0,greedy:!0,inside:t.languages.csharp},keyword:g,"class-name":{pattern:RegExp(c),greedy:!0,inside:a},punctuation:/[,()]/}},preprocessor:{pattern:/(^[\t ]*)#.*/m,lookbehind:!0,alias:"property",inside:{directive:{pattern:/(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,lookbehind:!0,alias:"keyword"}}}});var R=E+"|"+x,S=r(/\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source,[R]),$=l(r(/[^"'/()]|<<0>>|\(<<self>>*\)/.source,[S]),2),_=/\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source,U=r(/<<0>>(?:\s*\(<<1>>*\))?/.source,[i,$]);t.languages.insertBefore("csharp","class-name",{attribute:{pattern:e(/((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source,[_,U]),lookbehind:!0,greedy:!0,inside:{target:{pattern:e(/^<<0>>(?=\s*:)/.source,[_]),alias:"keyword"},"attribute-arguments":{pattern:e(/\(<<0>>*\)/.source,[$]),inside:t.languages.csharp},"class-name":{pattern:RegExp(i),inside:{punctuation:/\./}},punctuation:/[:,]/}}});var k=/:[^}\r\n]+/.source,I=l(r(/[^"'/()]|<<0>>|\(<<self>>*\)/.source,[S]),2),B=r(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source,[I,k]),C=l(r(/[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source,[R]),2),D=r(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source,[C,k]);function K(n,u){return{interpolation:{pattern:e(/((?:^|[^{])(?:\{\{)*)<<0>>/.source,[n]),lookbehind:!0,inside:{"format-string":{pattern:e(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source,[u,k]),lookbehind:!0,inside:{punctuation:/^:/}},punctuation:/^\{|\}$/,expression:{pattern:/[\s\S]+/,alias:"language-csharp",inside:t.languages.csharp}}},string:/[\s\S]+/}}t.languages.insertBefore("csharp","string",{"interpolation-string":[{pattern:e(/(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source,[B]),lookbehind:!0,greedy:!0,inside:K(B,I)},{pattern:e(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source,[D]),lookbehind:!0,greedy:!0,inside:K(D,C)}],char:{pattern:RegExp(x),greedy:!0}}),t.languages.dotnet=t.languages.cs=t.languages.csharp})(z)}return m}export{Z as r};
//# sourceMappingURL=csharp-PWFMKVck.js.map