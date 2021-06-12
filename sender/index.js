import { CodeCast } from 'codecast/sender'
import { InputCast } from 'inputcast/sender'

window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    cast.framework.CastContext.getInstance().setOptions({
      receiverApplicationId: 'D8CC1620',
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    })
    
    const codeCast = new CodeCast()
    const inputCast = new InputCast()
    const player = new cast.framework.RemotePlayer()
    const controller = new cast.framework.RemotePlayerController(player)
    const events = cast.framework.RemotePlayerEventType

    controller.addEventListener(events.IS_CONNECTED_CHANGED, () => {
      codeCast.send('code-to-cast.js').then(() => {
        inputCast.onBeforeKeyboard(InputCast.INPUT.ALL, event => {
          event.preventDefault()
          return event
        })
      })
    })
  }
}
