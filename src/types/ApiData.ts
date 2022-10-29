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

export interface RealtimeData {
    domainId: number;
    domainName: string;
    ipAddress: string;
    activeService: number;
    activeServiceRangeCount0: number;
    activeServiceRangeCount1: number;
    activeServiceRangeCount2: number;
    activeServiceRangeCount3: number;
    activeUser: number;
    tps: number;
    responseTime: number;
    concurrentUser: number;
    rejectRate: number;
    hitHour: number;
    visitHour: number;
    hitDay: number;
    visitDay: number;
    port: number;
}
