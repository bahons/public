import { authScriptUrls, contentScriptUrls, mathScripts, playerScriptUrls } from "../constants/script_url";

const remScript = () => {
   const scripts = Array.from(document.getElementsByTagName("script"));
   scripts.forEach((script) => {
      if (!script.src.includes("bundle.js")) {
         script.remove();
      }
   });
};

const createScript = (url: string) => {
   const script = document.createElement("script");
   script.src = url;
   script.async = true;
   if (url.includes("mathjax")) {
      script.id = "MathJax-script";
   }
   return script;
};

const importScript = (url: string) => {
   const script = createScript(url);
   document.body.appendChild(script);
   return script;
};

const importScripts = (urls: string[]) => {
   remScript();
   urls.forEach((url) => importScript(url));
};

export const importAuthScripts = () => importScripts(authScriptUrls);
export const importContentScripts = () => importScripts(contentScriptUrls);
export const importPlayerScripts = () => importScripts(playerScriptUrls);
export const importMathScripts = () => importScripts(mathScripts);

// <?xml version="1.0" encoding="UTF-8"?>
// <configuration>
//     <system.webServer>
// 		<rewrite>
// 		  <rules>
// 			<rule name="ReactRouter Routes" stopProcessing="true">
// 			  <match url=".*" />
// 			  <conditions logicalGrouping="MatchAll">
// 				<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
// 			  </conditions>
// 			  <action type="Rewrite" url="index.html" />
// 			</rule>

// 		  </rules>
// 		</rewrite>
//     </system.webServer>
// </configuration>
