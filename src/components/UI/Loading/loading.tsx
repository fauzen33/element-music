import React from 'react';
import { chaoticOrbit } from 'ldrs';
import styles from './loading.module.css';

interface Props {

}

export const Loading: React.FC<Props> = () => {
   
  chaoticOrbit.register()

  return (
		<div className={styles.BG}>
			<l-chaotic-orbit size='70' speed='1.5' color='white'></l-chaotic-orbit>
		</div>
	)
};