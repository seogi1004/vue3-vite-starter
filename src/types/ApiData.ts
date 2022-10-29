export interface TransactionData {
    domainId: number;
    domainName: string;
    instanceId: number;
    instanceOid: number;
    instanceName: string;
    business: number[];
    businessId: number[];
    businessName: string[];
    txid: string;
    guid: string;
    clientIp: string;
    clientId: string;
    userId: string;
    networkTime: string;
    frontendTime: string;
    startTime: string;
    endTime: string;
    responseTime: number;
    cpuTime: number;
    sqlTime: number;
    fetchTime: number;
    externalcallTime: number;
    errorType: string;
    applicationName: string;
}
