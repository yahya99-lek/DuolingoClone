import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors } from "@/constants/theme";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

interface TabConfig {
  activeIcon: IoniconName;
  inactiveIcon: IoniconName;
  label: string;
}

const TAB_CONFIG: Record<string, TabConfig> = {
  index: { activeIcon: "home", inactiveIcon: "home-outline", label: "Home" },
  learn: { activeIcon: "book", inactiveIcon: "book-outline", label: "Learn" },
  "ai-teacher": {
    activeIcon: "sparkles",
    inactiveIcon: "sparkles-outline",
    label: "AI Teacher",
  },
  chat: {
    activeIcon: "chatbubble",
    inactiveIcon: "chatbubble-outline",
    label: "Chat",
  },
  profile: {
    activeIcon: "person",
    inactiveIcon: "person-outline",
    label: "Profile",
  },
};

const CIRCLE_SIZE = 52;
const BAR_CONTENT_HEIGHT = 60;
const CIRCLE_TOP = (BAR_CONTENT_HEIGHT - CIRCLE_SIZE) / 2;

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(0);
  const circleX = useSharedValue(0);

  const getCircleX = (index: number, width: number) => {
    const tabWidth = width / state.routes.length;
    return index * tabWidth + tabWidth / 2 - CIRCLE_SIZE / 2;
  };

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: circleX.value }],
  }));

  useEffect(() => {
    if (containerWidth > 0) {
      circleX.value = withTiming(getCircleX(state.index, containerWidth), {
        duration: 250,
        easing: Easing.out(Easing.quad),
      });
    }
  }, [state.index, containerWidth]);

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: insets.bottom > 0 ? insets.bottom : 12 },
      ]}
      onLayout={(e) => {
        const width = e.nativeEvent.layout.width;
        setContainerWidth(width);
        circleX.value = getCircleX(state.index, width);
      }}
    >
      <Animated.View style={[styles.circle, { top: CIRCLE_TOP }, circleStyle]} />

      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        const config = TAB_CONFIG[route.name] ?? {
          activeIcon: "home" as IoniconName,
          inactiveIcon: "home-outline" as IoniconName,
          label: route.name,
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => {
              if (!isActive) {
                navigation.navigate(route.name);
              }
            }}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? config.activeIcon : config.inactiveIcon}
              size={22}
              color={isActive ? "#FFFFFF" : colors.textSecondary}
            />
            {!isActive && (
              <Text style={styles.label} numberOfLines={1}>
                {config.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: CIRCLE_TOP,
  },
  circle: {
    position: "absolute",
    left: 0,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: colors.primary,
  },
  tabItem: {
    flex: 1,
    height: BAR_CONTENT_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  label: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#6B7280",
    marginTop: 3,
  },
});
