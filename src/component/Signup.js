import React, { useState } from 'react'
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web'

import styles from './styles.module.css'

export default function Signup() {
  const [open, toggle] = useState(false)
  const [ref, { width }] = useMeasure()
  const props = useSpring({ width: open ? width : 0 })

  return (
    <div className={styles.container} >
      <div ref={ref} className={styles.main} onClick={() => toggle(!open)}>
        <animated.div className={styles.fill} style={props} />
        <animated.div className={styles.content} > Sign up </animated.div>
        
      </div>
    </div>
  )
}
