// Zet seconden om naar (mm:ss) bv 120 -> 02:00
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Volledig uitschrijven vb "2 min 0 sec"; netjes voor overview
export const formatTimeDetailed = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins} min ${secs} sec`
}
