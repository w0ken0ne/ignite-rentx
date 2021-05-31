import { RFValue } from "react-native-responsive-fontsize";
import Svg from "react-native-svg";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.background_secondary};
  width: 100%;
  height:126px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding:24px;
  margin-bottom: 16px;
`
export const Details = styled.View`
  padding: 24px;
`;
export const Rent = styled.View`

`;
export const About = styled.View`
  margin-top: 16px;
`;

export const Period = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.secondary_400};
  color: ${({theme}) => theme.colors.text_detail};
`;
export const Brand = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: ${({theme}) => theme.fonts.secondary_400};
  color: ${({theme}) => theme.colors.text_detail};
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.title};
`;

export const Price = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.main};
`;

export const Type = styled(Svg)`
`;
export const CarImage = styled.Image`
  width: 160px;
  height:92px;
`;