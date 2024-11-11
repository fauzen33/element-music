import React from 'react';
import styles from './combobox.module.css'
import { useClickAway } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
  values: Array<string>;
  active: boolean;
  setActive: (active: boolean) => void
  onSelect: (value: string) => void
  ref?: any
}

export const Combobox: React.FC<Props> = ({ className,values, active, setActive, onSelect }) => {

  const handleSelect =(value: string) => {
    onSelect(value)
    setActive(false)
  }
  const ref = useClickAway(() => setActive(false))

  return (
		<div className={className}>
			<motion.div
				className={styles.comboboxBG}
				ref={ref as React.RefObject<HTMLDivElement>}
				initial={false}
				animate={active ? 'visible' : 'hidden'}
				transition={{
					duration: 0.1,
					ease: 'easeOut',
				}}
				variants={{
					visible: {
						opacity: 1,
						y: 0,
            visibility: 'visible',
					},
					hidden: {
						opacity: 0,
						y: -10,
            visibility: 'hidden',
					},
				}}
			>
				<ul className={styles.combobox}>
					{values.map(value => (
						<li
							className={styles.comboboxItem}
							onClick={() => handleSelect(value)}
							key = {value}
						>
							{value}
						</li>
					))}
				</ul>
			</motion.div>
		</div>
	)
};