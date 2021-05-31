import React from 'react'
import { About, Brand, CarImage, Container, Details, Name, Period, Price, Rent, Type } from './styles'
import Hybrid from '../../assets/hybrid.svg'
import CarPhoto from '../../assets/placeholder_car.png'
interface CarProps {
  data: CarData;
}

interface CarData{
    brand: string;
    model: string;
    rent: {
      recurrency: 'daily';
      price: number;
    };
    thumbnail: string;
  
}
export function Car({data}: CarProps){
  return (
     <Container>
       <Details>
            <Brand>{data.brand}</Brand>
            <Name>{data.model}</Name>
          <About>
            <Rent>
               <Period>{data.rent.recurrency}</Period>
              <Price>{`R$ ${data.rent.price}`}</Price>
            </Rent>
            <Type><Hybrid/></Type>
          </About>

       </Details>
        <CarImage source={{uri: data.thumbnail}} resizeMode="contain" />

     </Container>
  )
}