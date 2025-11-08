declare module '@emailjs/browser' {
  export interface EmailJSResponseStatus {
    status: number
    text: string
  }

  export interface EmailJSSendOptions {
    publicKey?: string
  }

  export interface EmailJSTemplateParams {
    [key: string]: unknown
  }

  export function send(
    serviceId: string,
    templateId: string,
    templateParams?: EmailJSTemplateParams,
    publicKeyOrOptions?: string | EmailJSSendOptions
  ): Promise<EmailJSResponseStatus>

  export function init(publicKey: string, origin?: string): void

  const emailjs: {
    send: typeof send
    init: typeof init
  }

  export default emailjs
}

