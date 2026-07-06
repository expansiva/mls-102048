/// <mls fileReference="_102048_/l2/cafeFlow/messagesAside.ts" enhancement="_blank" />

import { LitElement, html } from 'lit';
import { setEnvironment } from '/_102036_/l2/environmentContract.js';
import type { MasterFrontendBootConfig } from '/_102033_/l2/shared/contracts/bootstrap.js';
import '/_102025_/l2/collabMessages.js';

setEnvironment({
  config: {
    getApiUrl: () => 'http://localhost:8180/msg',
    getApiCredentials: () => 'omit',
    getDefaultUserName: () => 'Cafe Flow',
  },
});

export class CafeFlowMessagesAside extends LitElement {
  static properties = {
    bootConfig: { attribute: false },
  };

  declare bootConfig?: MasterFrontendBootConfig;

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <link rel="stylesheet" href="/_102048_/l2/cafeFlow/messagesAside.css" />
      <aside class="h-full w-full overflow-hidden border-r border-slate-200 bg-white">
        <collab-messages-102025
          class="block h-full w-full"
          style="--collab-messages-width: 100%;"
        ></collab-messages-102025>
      </aside>
    `;
  }
}

customElements.define('cafe-flow-messages-aside-102048', CafeFlowMessagesAside);
