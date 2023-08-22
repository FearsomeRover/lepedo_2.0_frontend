import { cardData } from '@/types/cardData';
import styles from './card.module.css'
export default function Card(data: cardData) {
  return (
      <div style={{backgroundColor:data.color}}>
        <h5>{data.title}</h5>
        <h2>{data.value}</h2>
        {data.bottomLink && (
          <button onClick={data.bottomLink.action}>{data.bottomLink.name}</button>
        )}
      </div>
  );
}
