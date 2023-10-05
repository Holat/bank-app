import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { Accounts, Icon } from "../constants";
import Animated, {
FadeInDown,
runOnJS,
useAnimatedStyle,
useSharedValue,
withSpring,
withTiming,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const Card = () => {
const [currentAcct, setCurrentAcct] = useState("a0");
const translateY = useSharedValue(0);

const zIndex = useSharedValue(3);
const top = useSharedValue(40);
const opacity = useSharedValue(1);
const width = useSharedValue(100);

const zIndex1 = useSharedValue(2);
const top1 = useSharedValue(20);
const opacity1 = useSharedValue(0.9);
const width1 = useSharedValue(90);

const zIndex2 = useSharedValue(1);
const top2 = useSharedValue(0);
const opacity2 = useSharedValue(0.8);
const width2 = useSharedValue(80);

const stackOrder = [3, 2, 1];

const panGesture = useMemo(
() =>
Gesture.Pan()
.onUpdate((e) => {
translateY.value = Math.max(0, Math.min(e.translationY, 60));
})
.onEnd((e) => {
if (translateY.value >= 60) {
translateY.value = withSpring(0);
zIndex.value = withTiming(-3);
top.value = withSpring(0);
width.value = withSpring(80);
opacity.value = withTiming(0.8);

            zIndex1.value = withTiming(3);
            top1.value = withSpring(40);
            width1.value = withSpring(100);
            opacity1.value = withTiming(1);

            zIndex2.value = withTiming(2);
            top2.value = withSpring(20);
            width2.value = withSpring(90);
            opacity2.value = withTiming(0.9);
          } else {
            translateY.value = withSpring(0);
          }
        }),
    []

);

const rStyle = useAnimatedStyle(() => {
return {
transform: [{ translateY: translateY.value }],
opacity: opacity.value,
width: `${width.value}%`,
top: top.value,
zIndex: zIndex.value,
};
});

const rStyle1 = useAnimatedStyle(() => {
return {
width: `${width1.value}%`,
opacity: opacity1.value,
top: top1.value,
};
});

const rStyle2 = useAnimatedStyle(() => {
return {
width: `${width2.value}%`,
opacity: opacity2.value,
top: top2.value,
};
});

return (
<View style={styles.cont}>
{Accounts.map((acct, i) => {
return (
<GestureDetector gesture={panGesture} key={acct.id}>
<Animated.View
entering={FadeInDown.springify().delay(i \* 100)}
style={[
styles.card,
{ backgroundColor: acct.color },
i === 2 && rStyle,
i === 1 && rStyle1,
i === 0 && rStyle2,
]} >
<Text style={styles.cardTxt1}>{acct.name} Account</Text>
<View>
<Text style={styles.cardTxt1}>Balance: </Text>
<Text style={styles.cardTxt2}>${acct.balance}</Text>
</View>
<Icon i={acct.id} style={styles.backG} />
</Animated.View>
</GestureDetector>
);
})}
</View>
);
};

export default Card;

const styles = StyleSheet.create({
cont: {
paddingVertical: 20,
position: "relative",
alignItems: "center",
paddingHorizontal: 10,
flex: 1,
marginVertical: 10,
},

card: {
backgroundColor: "#001c55",
height: 180,
width: "100%",
borderRadius: 10,
padding: 20,
position: "absolute",
overflow: "hidden",
justifyContent: "space-between",
shadowColor: "#000",
shadowOffset: {
width: 0,
height: 2,
},
shadowRadius: 3.84,
shadowOpacity: 0.25,

    // elevation: 10,

},

cardTxt1: {
color: "white",
fontWeight: "500",
fontFamily: "Roboto-Medium",
},

cardTxt2: {
color: "white",
fontSize: 25,
fontWeight: "bold",
fontFamily: "Mon",
},

backG: {
position: "absolute",
top: -10,
right: -20,
transform: [{ rotate: "-45deg" }],
zIndex: -1,
opacity: 0.8,
},
});
