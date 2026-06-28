import { useState, useEffect, useRef } from 'react'

/**
 * Types out `fullText` character by character.
 * Respects prefers-reduced-motion by rendering the full text instantly.
 *
 * @param {string} fullText - the complete text to type out
 * @param {number} speed - ms delay between characters
 * @returns {{ displayed: string, done: boolean }}
 */
export function useTypingEffect(fullText, speed = 28) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setDisplayed(fullText)
      setDone(true)
      return
    }

    const interval = setInterval(() => {
      indexRef.current += 1
      setDisplayed(fullText.slice(0, indexRef.current))
      if (indexRef.current >= fullText.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [fullText, speed])

  return { displayed, done }
}
