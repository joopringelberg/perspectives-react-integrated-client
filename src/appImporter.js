// TODO. Probleem hier is: deze file wordt niet door Webpack behandeld.
// Het is een catch-22: importRoleScreen is een external voor react-integrated-client en moet dus al in de omgeving aanwezig zijn
// voordat die geladen wordt. Maar hij heeft modules nodig die pas door react-integrated-client geladen worden...
// ALHOEWEL: het gaat fout op perspectives-proxy - die module kan niet worden gevonden. Maar dan is ie dus al bezig om perspectives-react
// te laden. Dat kan hij kennelijk wel?
// De oplossing is eenvoudig: herstel deze module tot een simpele functie en verplaats deze code naar een andere module.

import { getModelName, deconstructLocalNameFromDomeinURI_ } from "perspectives-react";
import { host } from "./globals.js";

import "importModule";

export function importRoleScreen( roleName )
{
  // modelName = model part of the roleName
  const modelName = "model:" + getModelName( roleName );

  // screenName = local part of the roleName
  const screenName = deconstructLocalNameFromDomeinURI_(roleName);

  // url = host + "perspect_models/" + <modelName> + "/screens.js"
  const url = host + "perspect_models/" + modelName + "/screens.js"

  return importModule( url ).then(
    function(r)
    {
      if (!r[ screenName ])
      {
        throw "importRoleScreen: no screen is defined for '" + screenName + "' in model '" + modelName + "'!";
      }
      return r[ screenName ];
    }
  );
}
