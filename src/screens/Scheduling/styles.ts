import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";
interface DateValueProps{
  selected: boolean;
}
export const Container = styled.View`
  flex:1;
`
export const Header = styled.View`
  width: 100%;
  height:325px;
  background-color: ${({theme})=>theme.colors.header};
  justify-content:center;
  padding: 25px;
  padding-top: ${getStatusBarHeight()+30}px;
  
`;
export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  color: ${({theme}) => theme.colors.background_secondary};
`;
export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin:32px 0;
`;

export const DateInfo = styled.View`
  width: 30%;

`;
export const DateValue = styled.Text<DateValueProps>`
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.shape};
  ${({theme, selected}) => !selected  && css`
    border-bottom-width: 1px;
    border-bottom-color: ${theme.colors.background_primary};
    padding-bottom: 5px;
  
  `}
`;

export const DateTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  color: ${({theme}) => theme.colors.text};
`;
export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24
  },
  showsVerticalScrollIndicator: false
})`
`;
export const Footer = styled.View`
   width: 100%;
  margin-top: 40px;
  padding: 24px 24px ${getBottomSpace()+24}px;
`;
            