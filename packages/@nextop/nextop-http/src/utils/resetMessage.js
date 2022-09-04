/*
 * @Author: hongdong.liao
 * @Date: 2021-05-27 16:13:24
 * @LastEditors: hongdong.liao
 * @LastEditTime: 2021-05-27 16:33:00
 * @FilePath: /nextop/packages/@nextop/nextop-http/src/utils/resetMessage.js
 */
import { Message, } from 'element-ui';
let messageInstance = null;
const resetMessage = (options) => {
  if(messageInstance) {
      messageInstance.close()
  }
  messageInstance = Message(options)
};
['error','success','info','warning'].forEach(type => {
  resetMessage[type] = options => {
      if(typeof options === 'string') {
          options = {
              message:options
          }
      }
      options.type = type
      return resetMessage(options)
  }
})
export const message = resetMessage;
