import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { EMIPlan } from "../data/marketplaceData";

type EMIPlanCardProps = {
    plan: EMIPlan;
    selected: boolean;
    onPress: () => void;
};

export default function EMIPlanCard({
    plan,
    selected,
    onPress,
}: EMIPlanCardProps) {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.card,
                selected && styles.selectedCard,
            ]}
        >
            <View style={styles.radioContainer}>
                <View
                    style={[
                        styles.radio,
                        selected && styles.radioSelected,
                    ]}
                >
                    {selected && <View style={styles.radioInner} />}
                </View>
            </View>

            <View style={styles.info}>
                <Text style={styles.tenure}>
                    {plan.tenure} Months
                </Text>

                <Text style={styles.emi}>
                    ₹{plan.monthlyEMI.toLocaleString("en-IN")}/month
                </Text>

                <Text style={styles.interest}>
                    {plan.interestRate}
                </Text>
            </View>

            <View style={styles.amountContainer}>
                <Text style={styles.totalLabel}>
                    Total
                </Text>

                <Text style={styles.totalAmount}>
                    ₹{plan.totalAmount.toLocaleString("en-IN")}
                </Text>

                {selected && (
                    <MaterialCommunityIcons
                        name="check-circle"
                        size={22}
                        color="#5B2C83"
                        style={styles.check}
                    />
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E5E5E5",
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
    },

    selectedCard: {
        borderColor: "#5B2C83",
        borderWidth: 2,
        backgroundColor: "#FAF7FD",
    },

    radioContainer: {
        marginRight: 14,
    },

    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: "#B0B0B0",
        alignItems: "center",
        justifyContent: "center",
    },

    radioSelected: {
        borderColor: "#5B2C83",
    },

    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#5B2C83",
    },

    info: {
        flex: 1,
    },

    tenure: {
        fontSize: 17,
        fontWeight: "800",
        color: "#292738",
    },

    emi: {
        fontSize: 15,
        fontWeight: "700",
        color: "#5B2C83",
        marginTop: 4,
    },

    interest: {
        fontSize: 12,
        color: "#777",
        marginTop: 4,
    },

    amountContainer: {
        alignItems: "flex-end",
    },

    totalLabel: {
        fontSize: 12,
        color: "#777",
    },

    totalAmount: {
        fontSize: 14,
        fontWeight: "800",
        color: "#292738",
        marginTop: 3,
    },

    check: {
        marginTop: 6,
    },
});
