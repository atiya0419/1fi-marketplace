import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { getProductById } from "../../api/marketplaceApi";
import EMIPlanCard from "../../components/EMIPlanCard";
import {
    EMIPlan,
    Product,
    ProductVariant,
} from "../../data/marketplaceData";
import { colors } from "../../theme/colors";

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const [product, setProduct] = useState<Product | undefined>();
    const [loading, setLoading] = useState(true);

    const [selectedVariant, setSelectedVariant] =
        useState<ProductVariant | undefined>();

    const [selectedPlan, setSelectedPlan] =
        useState<EMIPlan | undefined>();

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        if (!id) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const data = await getProductById(id);

            setProduct(data);

            if (data) {
                setSelectedVariant(data.variants[0]);
                setSelectedPlan(data.emiPlans[0]);
            }
        } catch (error) {
            console.log("Failed to load product", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loader}>
                    <ActivityIndicator
                        size="large"
                        color={colors.primary}
                    />
                </View>
            </SafeAreaView>
        );
    }

    if (!product) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loader}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={48}
                        color={colors.primary}
                    />

                    <Text style={styles.notFound}>
                        Product not found
                    </Text>

                    <Pressable
                        style={styles.goBackButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.goBackText}>
                            Go Back
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    const handleProceed = () => {
        if (!selectedPlan) return;

        console.log({
            productId: product.id,
            productName: product.name,
            selectedVariant: selectedVariant?.value,
            selectedPlan: selectedPlan.tenure,
            monthlyEMI: selectedPlan.monthlyEMI,
        });

        router.back();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Top Bar */}
                <View style={styles.topBar}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={colors.text}
                        />
                    </Pressable>

                    <Text style={styles.topTitle}>
                        Product Details
                    </Text>

                    <View style={styles.backButton}>
                        <Ionicons
                            name="share-social-outline"
                            size={22}
                            color={colors.primary}
                        />
                    </View>
                </View>

                {/* Product Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                    />

                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                            {product.discount}
                        </Text>
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Product Information */}
                    <Text style={styles.brand}>
                        {product.brand}
                    </Text>

                    <Text style={styles.productName}>
                        {product.name}
                    </Text>

                    <View style={styles.ratingRow}>
                        <View style={styles.ratingBadge}>
                            <Ionicons
                                name="star"
                                size={15}
                                color="#FFFFFF"
                            />

                            <Text style={styles.ratingText}>
                                {product.rating}
                            </Text>
                        </View>

                        <Text style={styles.reviewText}>
                            {product.reviews} customer reviews
                        </Text>
                    </View>

                    {/* Price */}
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>
                            ₹{product.price.toLocaleString("en-IN")}
                        </Text>

                        <Text style={styles.originalPrice}>
                            ₹
                            {product.originalPrice.toLocaleString(
                                "en-IN"
                            )}
                        </Text>
                    </View>

                    {/* EMI Summary */}
                    {selectedPlan && (
                        <View style={styles.emiCard}>
                            <View style={styles.emiIcon}>
                                <Ionicons
                                    name="wallet-outline"
                                    size={26}
                                    color={colors.primary}
                                />
                            </View>

                            <View style={styles.emiContent}>
                                <Text style={styles.emiTitle}>
                                    {selectedPlan.interestRate}
                                </Text>

                                <Text style={styles.emiDescription}>
                                    ₹
                                    {selectedPlan.monthlyEMI.toLocaleString(
                                        "en-IN"
                                    )}
                                    /month for{" "}
                                    {selectedPlan.tenure} months
                                </Text>
                            </View>
                        </View>
                    )}

                    {/* Description */}
                    <Text style={styles.sectionTitle}>
                        About this product
                    </Text>

                    <Text style={styles.description}>
                        {product.description}
                    </Text>

                    {/* Product Variants */}
                    <Text style={styles.sectionTitle}>
                        Choose {product.variants[0]?.name || "Variant"}
                    </Text>

                    <View style={styles.variantContainer}>
                        {product.variants.map((variant) => {
                            const isSelected =
                                selectedVariant?.id === variant.id;

                            return (
                                <Pressable
                                    key={variant.id}
                                    onPress={() =>
                                        setSelectedVariant(
                                            variant
                                        )
                                    }
                                    style={[
                                        styles.variantButton,
                                        isSelected &&
                                        styles.variantButtonSelected,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.variantText,
                                            isSelected &&
                                            styles.variantTextSelected,
                                        ]}
                                    >
                                        {variant.value}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>

                    {/* EMI Plans */}
                    <Text style={styles.sectionTitle}>
                        Choose EMI plan
                    </Text>

                    <View style={styles.emiPlansContainer}>
                        {product.emiPlans.map((plan) => (
                            <EMIPlanCard
                                key={plan.id}
                                plan={plan}
                                selected={
                                    selectedPlan?.id ===
                                    plan.id
                                }
                                onPress={() =>
                                    setSelectedPlan(plan)
                                }
                            />
                        ))}
                    </View>
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Bottom CTA */}
            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.bottomPrice}>
                        {selectedPlan
                            ? `₹${selectedPlan.monthlyEMI.toLocaleString(
                                "en-IN"
                            )}/month`
                            : `₹${product.price.toLocaleString(
                                "en-IN"
                            )}`}
                    </Text>

                    <Text style={styles.bottomSubText}>
                        {selectedPlan
                            ? `${selectedPlan.tenure} month EMI plan`
                            : "Select an EMI plan"}
                    </Text>
                </View>

                <Pressable
                    style={[
                        styles.buyButton,
                        !selectedPlan &&
                        styles.buyButtonDisabled,
                    ]}
                    disabled={!selectedPlan}
                    onPress={handleProceed}
                >
                    <Text style={styles.buyButtonText}>
                        Proceed
                    </Text>

                    <Ionicons
                        name="arrow-forward"
                        size={20}
                        color={colors.white}
                    />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    container: {
        flex: 1,
    },

    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    notFound: {
        marginTop: 12,
        fontSize: 18,
        color: colors.text,
        fontWeight: "600",
    },

    goBackButton: {
        marginTop: 20,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
    },

    goBackText: {
        color: colors.white,
        fontWeight: "700",
    },

    topBar: {
        height: 64,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    topTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
    },

    backButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: "center",
        alignItems: "center",
    },

    imageContainer: {
        marginHorizontal: 20,
        height: 330,
        borderRadius: 24,
        backgroundColor: colors.surface,
        overflow: "hidden",
        position: "relative",
    },

    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },

    discountBadge: {
        position: "absolute",
        top: 16,
        right: 16,
        backgroundColor: "#DCFCE7",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 10,
    },

    discountText: {
        color: "#15803D",
        fontWeight: "700",
        fontSize: 12,
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
    },

    brand: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.primary,
    },

    productName: {
        marginTop: 6,
        fontSize: 28,
        fontWeight: "800",
        color: colors.text,
    },

    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },

    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#16A34A",
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 8,
    },

    ratingText: {
        marginLeft: 4,
        color: colors.white,
        fontWeight: "700",
        fontSize: 13,
    },

    reviewText: {
        marginLeft: 10,
        color: colors.textSecondary,
        fontSize: 13,
    },

    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
    },

    price: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.text,
    },

    originalPrice: {
        marginLeft: 12,
        fontSize: 16,
        color: colors.textLight,
        textDecorationLine: "line-through",
    },

    emiCard: {
        marginTop: 22,
        padding: 16,
        borderRadius: 18,
        backgroundColor: colors.primaryLight,
        flexDirection: "row",
        alignItems: "center",
    },

    emiIcon: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
    },

    emiContent: {
        marginLeft: 14,
        flex: 1,
    },

    emiTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.text,
    },

    emiDescription: {
        marginTop: 4,
        fontSize: 13,
        color: colors.textSecondary,
    },

    sectionTitle: {
        marginTop: 28,
        fontSize: 20,
        fontWeight: "700",
        color: colors.text,
    },

    description: {
        marginTop: 10,
        fontSize: 15,
        lineHeight: 23,
        color: colors.textSecondary,
    },

    variantContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 15,
        gap: 10,
    },

    variantButton: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 12,
    },

    variantButtonSelected: {
        backgroundColor: colors.primaryLight,
        borderColor: colors.primary,
        borderWidth: 2,
    },

    variantText: {
        color: colors.textSecondary,
        fontWeight: "600",
        fontSize: 14,
    },

    variantTextSelected: {
        color: colors.primary,
        fontWeight: "800",
    },

    emiPlansContainer: {
        marginTop: 15,
    },

    bottomBar: {
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: 20,
        paddingVertical: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    bottomPrice: {
        fontSize: 20,
        fontWeight: "800",
        color: colors.text,
    },

    bottomSubText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },

    buyButton: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    buyButtonDisabled: {
        opacity: 0.5,
    },

    buyButtonText: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "700",
    },
});
