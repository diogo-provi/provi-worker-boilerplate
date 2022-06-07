export default interface HttpClient {
  request(method: string, url: string, data?: any): Promise<any>;
}
