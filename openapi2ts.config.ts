export default {
  schemaPath: 'http://127.0.0.1:7001/swagger-ui/index.json',
  serversPath: './src',
  requestLibPath: 'import request from "@/request";',
  isCamelCase: false,
  hook: {
    customFunctionName: (data: any) => {
      const res = data.tags[0] + '_' + data.operationId;
      return res.replace(/-/g, '_');
    }
  }
}