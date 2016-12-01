/*
  NEWEST: Indicates to get the most recent image. Used only the first time
  the App starts. It sets the action type to LATEST.
  LATEST: Indicates to get the latest image available. Decrements the current
  date by one and sets the constant LATEST DAY to this decremented date value.
 */
const ActionType = {
  PREVIOUS: 'previous',
  RANDOM: 'random',
  NEXT: 'next',
  NEWEST: 'newest',
  LATEST: 'latest'
}

export default ActionType
