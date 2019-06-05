
function myImport( moduleFile )
{
  return import("app://" + __dirname + "/" + moduleFile + ".js").then(
    function(r)
    {
      return r;
    }
  );
}
