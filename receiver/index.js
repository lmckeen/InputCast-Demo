import { CodeCast } from 'codecast/receiver'

const context = cast.framework.CastReceiverContext.getInstance()
const codeCast = new CodeCast()

context.addCustomMessageListener('urn:x-cast:com.inputcast.gamepad', () => {})
context.addCustomMessageListener('urn:x-cast:com.inputcast.keyboard', () => {})

codeCast.start({
  disableIdleTimeout: true
})