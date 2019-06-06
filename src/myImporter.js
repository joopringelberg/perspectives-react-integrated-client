
function myImport( moduleFile )
{
  return import("http://localhost:5984/perspect_models/models:Perspectives/Perspectives.js");
  // return import("app://" + __dirname + "/" + moduleFile + ".js").then(
  //   function(r)
  //   {
  //     return r;
  //   }
  // );
}
