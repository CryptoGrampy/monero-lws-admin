const runtimeConfig = useRuntimeConfig();

enum LwsAdminCommand {
  acceptRequests = "accept_requests",
  addAccount = "add_account",
  listAccounts = "list_accounts",
  listRequests = "list_requests",
  modifyAccountStatus = "modify_account_status",
  rejectRequests = "reject_requests",
  rescan = "rescan",
}

export interface ListRequestsResponse {
  create: AccountCreationRequest[];
}

export interface ListAccountsResponse {
  active: Account[];
  inactive: Account[];
  hidden: Account[];
}

export interface Account {
  address: string;
  scan_height: string;
  access_time: number;
}

export interface AccountCreationRequest {
  address: string;
  start_height: number;
}

export class MoneroLwsAdmin {
  private apiKey: string;
  private adminUrl: string;

  constructor(apiKey: string, adminUrl: string) {
    this.apiKey = apiKey;
    this.adminUrl = adminUrl;
  }

  private async lwsAdminRequest(command: LwsAdminCommand, params: any) {
    const url = `${this.adminUrl}/${command}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.apiKey,
          params: { ...params },
        }),
      });
      return response.json();
    } catch (error) {
      console.log("error with admin request", error);
    }
  }

  public async listRequests(): Promise<ListRequestsResponse> {
    return await this.lwsAdminRequest(LwsAdminCommand.listRequests, {});
  }

  public async acceptRequest(address: string) {
    return await this.lwsAdminRequest(LwsAdminCommand.acceptRequests, {
      type: "create",
      addresses: [address],
    });
  }

  public async listAccounts(): Promise<ListAccountsResponse> {
    return await this.lwsAdminRequest(LwsAdminCommand.listAccounts, {});
  }

  public async deactivateAccount(address: string) {
    return await this.lwsAdminRequest(LwsAdminCommand.modifyAccountStatus, {
      status: "inactive",
      addresses: [address],
    });
  }

  public async rejectRequest(address: string) {
    return await this.lwsAdminRequest(LwsAdminCommand.rejectRequests, {
      type: "create",
      addresses: [address],
    });
  }

  public async reactivateAccount(address: string) {
    return await this.lwsAdminRequest(LwsAdminCommand.modifyAccountStatus, {
      status: "active",
      addresses: [address],
    });
  }

  public async rescanAccount(address: string, height: number) {
    return await this.lwsAdminRequest(LwsAdminCommand.rescan, {
      height,
      addresses: [address],
    });
  }

  public async acceptAllRequests() {
    const requests = await this.listRequests();
    const addresses = requests.create.map((account) => account.address);
    return await this.lwsAdminRequest(LwsAdminCommand.acceptRequests, {
      type: "create",
      addresses,
    });
  }

  public async addAccount(address: string, key: string) {
    return await this.lwsAdminRequest(LwsAdminCommand.addAccount, {
      address,
      key,
    });
  }
}

export const lwsAdmin = new MoneroLwsAdmin(
  runtimeConfig.LWS_API_KEY,
  runtimeConfig.LWS_ADMIN_URL
);

// From LWS docs:
// accept_requests: {"type": "import"|"create", "addresses":[...]}
// add_account: {"address": ..., "key": ...}
// list_accounts: {}
// list_requests: {}
// modify_account_status: {"status": "active"|"hidden"|"inactive", "addresses":[...]}
// reject_requests: {"type": "import"|"create", "addresses":[...]}
// rescan: {"height":..., "addresses":[...]}
