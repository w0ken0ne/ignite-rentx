import React, { useEffect, useState } from "react";
import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/core";
import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { synchronize } from "@nozbe/watermelondb/sync";
import { useTheme } from "styled-components";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { StyleSheet, BackHandler, Alert } from "react-native";
import { LoadAnimation } from "../../components/LoadAnimation";
import { useAuth } from "../../hooks/auth";
import { useNetInfo } from "@react-native-community/netinfo";
import { database } from "../../database";
const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const theme = useTheme();
  const { user } = useAuth();
  const netInfo = useNetInfo();
  //button animation
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  //offline sync
  async function offlineSync() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );
        const { changes, latestVersion } = data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post(`/users/sync`, user);
      },
    });
  }

  useEffect(() => {
    //cleanup useEffect
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        const data = response ? response.data : [];
        if (isMounted) {
          setCars(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  function handleSeeMyRentedCars() {
    navigation.navigate("MyCars");
  }

  function handleCarDetails(selectedCar: CarDTO) {
    navigation.navigate("CarDetails", { car: selectedCar });
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!isLoading && (
            <TotalCars>{`Total de ${cars.length} ${
              cars.length > 1 ? "carros" : "carro"
            }`}</TotalCars>
          )}
        </HeaderContent>
      </Header>

      {isLoading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Car onPress={() => handleCarDetails(item)} data={item} />
          )}
        />
      )}
      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleSeeMyRentedCars}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
