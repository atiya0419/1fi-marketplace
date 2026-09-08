import { Image, Pressable, Text, View } from "react-native";

type ProductCardProps = {
    product: any;
    onPress: () => void;
    styles: any;
};

export const ProductCard = ({
    product,
    onPress,
    styles,
}: ProductCardProps) => {
    return (
        <Pressable
            style={styles.productCard}
            onPress={onPress}
        >
            <Image
                source={
                    typeof product.image === "string"
                        ? { uri: product.image }
                        : product.image
                }
                style={styles.productImage}
            />

            <View style={styles.productInfo}>
                <Text style={styles.productName}>
                    {product.name}
                </Text>

                <Text style={styles.productBrand}>
                    {product.brand}
                </Text>

                <Text style={styles.productPrice}>
                    {product.price}
                </Text>
            </View>
        </Pressable>
    );
};