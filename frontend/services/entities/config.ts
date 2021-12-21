/* eslint-disable  @typescript-eslint/explicit-module-boundary-types */
import { get } from "lodash";

import sendRequest from "services";
import endpoints from "fleet/endpoints";
import helpers from "fleet/helpers";
// import { IConfig } from "interfaces/host";

// TODO add other methods from "fleet/entities/config"

export default {
  loadAll: () => {
    const { CONFIG } = endpoints;
    const path = `${CONFIG}`;

    return sendRequest("GET", path);
  },
  update: (formData: any, enableFormat = false) => {
    const { CONFIG } = endpoints;
    let configData;

    if (enableFormat) {
      configData = helpers.formatConfigDataForServer(formData);
    } else {
      configData = formData;
    }

    if (get(configData, "smtp_settings.port")) {
      configData.smtp_settings.port = parseInt(
        configData.smtp_settings.port,
        10
      );
    }
    return sendRequest("PATCH", CONFIG, configData);
  },
};
