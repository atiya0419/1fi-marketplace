import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getProducts } from "../api/productService";
import { products } from "../data/products";

type Page =
  | "home"
  | "shop"
  | "emi"
  | "limit"
  | "profile"
  | "productDetails";

type ShopTab = "Top Brands" | "Nearby Stores" | "Marketplace";

export default function Index() {
  const [activePage, setActivePage] = useState<Page>("shop");

  const [activeTab, setActiveTab] =
    useState<ShopTab>("Nearby Stores");

  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);

  const [isImageModalVisible, setIsImageModalVisible] =
    useState(false);

  const imageScrollRef = useRef<ScrollView>(null);

  const [selectedVariant, setSelectedVariant] =
    useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] =
    useState<(typeof products)[0] | null>(null);

  const [productList, setProductList] =
    useState<typeof products>([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [productError, setProductError] =
    useState<string | null>(null);

  const [selectedEmi, setSelectedEmi] =
    useState<number | null>(null);

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      setProductError(null);

      const data = await getProducts();

      setProductList(data);
    } catch (error) {
      setProductError("Unable to load products.");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openProduct = (
    product: (typeof products)[0]
  ) => {
    setSelectedProduct(product);

    setSelectedVariant(null);
    setSelectedEmi(null);

    setSelectedImageIndex(0);

    setActivePage("productDetails");
  };

  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);

    setIsImageModalVisible(true);
  };

  const renderHome = () => (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageContent}>
        <Text style={styles.pageTitle}>
          Welcome to 1Fi 👋
        </Text>

        <Text style={styles.pageSubtitle}>
          Manage your shopping, EMI dues and spending
          limit in one place.
        </Text>

        <View style={styles.homeCard}>
          <MaterialCommunityIcons
            name="shopping-outline"
            size={45}
            color="#5B2C83"
          />

          <Text style={styles.homeCardTitle}>
            Explore Marketplace
          </Text>

          <Text style={styles.homeCardText}>
            Shop your favourite products and pay later
            with easy EMI options.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => setActivePage("shop")}
          >
            <Text style={styles.primaryButtonText}>
              Go to Shop
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );

  const renderShop = () => {
    if (loadingProducts) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Loading products...
          </Text>
        </View>
      );
    }

    if (productError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {productError}
          </Text>

          <Pressable
            style={styles.retryButton}
            onPress={loadProducts}
          >
            <Text style={styles.retryButtonText}>
              Retry
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.shopScrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Text style={styles.marketplaceLabel}>
            1FI MARKETPLACE
          </Text>

          <Text style={styles.heroTitle}>
            Shop now,{"\n"}
            <Text style={styles.heroHighlight}>
              Pay later using 1Fi
            </Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Shop your favourite products with easy{"\n"}
            no-cost EMI options.
          </Text>

          <Pressable
            style={styles.exploreButton}
            onPress={() => setActiveTab("Marketplace")}
          >
            <Text style={styles.exploreButtonText}>
              Explore Marketplace
            </Text>

            <MaterialCommunityIcons
              name="arrow-right"
              size={32}
              color="#5B2C83"
            />
          </Pressable>
        </View>

        <View style={styles.tabsContainer}>
          {(
            [
              "Top Brands",
              "Nearby Stores",
              "Marketplace",
            ] as ShopTab[]
          ).map((tab) => (
            <Pressable
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab &&
                  styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {activeTab === "Top Brands" && null}

        {activeTab === "Nearby Stores" && null}

        {activeTab === "Marketplace" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Marketplace
            </Text>

            {productList
              .filter(
                (product) =>
                  product.category === "Marketplace"
              )
              .map((product) => (
                <Pressable
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => openProduct(product)}
                >
                  <View style={styles.productIcon}>
                    <MaterialCommunityIcons
                      name="shopping-outline"
                      size={32}
                      color="#5B2C83"
                    />
                  </View>

                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>
                      {product.name}
                    </Text>

                    <Text style={styles.productBrand}>
                      {product.brand}
                    </Text>
                  </View>

                  <Text style={styles.productPrice}>
                    {product.price}
                  </Text>
                </Pressable>
              ))}
          </View>
        )}
      </ScrollView>
    );
  };

  const renderEmi = () => (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageContent}>
        <Text style={styles.pageTitle}>
          EMI Dues
        </Text>

        <Text style={styles.pageSubtitle}>
          Keep track of your upcoming EMI payments.
        </Text>

        <View style={styles.emiCard}>
          <Text style={styles.emiLabel}>
            Upcoming Payment
          </Text>

          <Text style={styles.emiAmount}>
            ₹4,999
          </Text>

          <Text style={styles.emiDate}>
            Due on 15 September
          </Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="calendar-check-outline"
            size={35}
            color="#5B2C83"
          />

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>
              No other dues
            </Text>

            <Text style={styles.infoText}>
              Your future EMI payments will appear here.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderLimit = () => (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageContent}>
        <Text style={styles.pageTitle}>
          Your Limit
        </Text>

        <Text style={styles.pageSubtitle}>
          Check your available shopping limit.
        </Text>

        <View style={styles.limitCard}>
          <Text style={styles.limitLabel}>
            Available Limit
          </Text>

          <Text style={styles.limitAmount}>
            ₹50,000
          </Text>

          <View style={styles.limitDivider} />

          <Text style={styles.limitUsed}>
            Used Limit: ₹0
          </Text>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons
            name="information-outline"
            size={35}
            color="#5B2C83"
          />

          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>
              Use your 1Fi limit
            </Text>

            <Text style={styles.infoText}>
              Shop eligible products and convert purchases
              into EMI.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageContent}>
        <Text style={styles.pageTitle}>
          Profile
        </Text>

        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <MaterialCommunityIcons
              name="account"
              size={55}
              color="#5B2C83"
            />
          </View>

          <Text style={styles.profileName}>
            1Fi User
          </Text>

          <Text style={styles.profileEmail}>
            Manage your account details
          </Text>
        </View>

        <Pressable
          style={styles.profileOption}
          onPress={() =>
            Alert.alert(
              "Profile",
              "Personal details section"
            )
          }
        >
          <MaterialCommunityIcons
            name="account-outline"
            size={28}
            color="#5B2C83"
          />

          <Text style={styles.profileOptionText}>
            Personal Details
          </Text>

          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color="#777"
          />
        </Pressable>

        <Pressable
          style={styles.profileOption}
          onPress={() =>
            Alert.alert(
              "Settings",
              "Settings section"
            )
          }
        >
          <MaterialCommunityIcons
            name="cog-outline"
            size={28}
            color="#5B2C83"
          />

          <Text style={styles.profileOptionText}>
            Settings
          </Text>

          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color="#777"
          />
        </Pressable>
      </View>
    </ScrollView>
  );

  const renderProductDetails = () => {
    if (!selectedProduct) {
      return null;
    }

    return (
      <>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            style={styles.backButton}
            onPress={() => setActivePage("shop")}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color="#5B2C83"
            />

            <Text style={styles.backButtonText}>
              Back
            </Text>
          </Pressable>

          {/* MAIN PRODUCT IMAGE */}
          <Pressable
            onPress={() =>
              openImageViewer(selectedImageIndex)
            }
          >
            <Image
              source={
                selectedProduct.images
                  ? selectedProduct.images[
                  selectedImageIndex
                  ]
                  : typeof selectedProduct.image ===
                    "string"
                    ? {
                      uri: selectedProduct.image,
                    }
                    : selectedProduct.image
              }
              style={styles.detailProductImage}
            />
          </Pressable>

          {/* THUMBNAILS */}
          {selectedProduct.images &&
            selectedProduct.images.length > 1 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.thumbnailScroll}
              >
                {selectedProduct.images.map(
                  (
                    image: any,
                    index: number
                  ) => (
                    <Pressable
                      key={index}
                      onPress={() =>
                        openImageViewer(index)
                      }
                      style={[
                        styles.thumbnailButton,
                        selectedImageIndex ===
                        index &&
                        styles.selectedThumbnail,
                      ]}
                    >
                      <Image
                        source={image}
                        style={
                          styles.thumbnailImage
                        }
                      />
                    </Pressable>
                  )
                )}
              </ScrollView>
            )}

          <Text style={styles.detailProductName}>
            {selectedProduct.name}
          </Text>

          <Text style={styles.detailProductBrand}>
            {selectedProduct.brand}
          </Text>

          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons
              name="star"
              size={20}
              color="#F5A623"
            />

            <Text style={styles.ratingText}>
              {selectedProduct.rating}
            </Text>

            <Text style={styles.reviewText}>
              ({selectedProduct.reviews} reviews)
            </Text>
          </View>

          <Text style={styles.detailProductPrice}>
            {selectedProduct.price}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.originalPrice}>
              {selectedProduct.originalPrice}
            </Text>

            <Text style={styles.discountText}>
              {selectedProduct.discount}
            </Text>
          </View>

          <Text style={styles.productDetailsTitle}>
            Product Details
          </Text>

          <View style={styles.productDetailsContainer}>
            {selectedProduct.details.map(
              (
                detail: string,
                index: number
              ) => (
                <View
                  key={index}
                  style={
                    styles.productDetailRow
                  }
                >
                  <Text
                    style={
                      styles.productDetailBullet
                    }
                  >
                    •
                  </Text>

                  <Text
                    style={
                      styles.productDetailsText
                    }
                  >
                    {detail}
                  </Text>
                </View>
              )
            )}
          </View>

          <Text style={styles.variantTitle}>
            Select Variant
          </Text>

          <View style={styles.variantsContainer}>
            {selectedProduct.variants.map(
              (variant: string) => (
                <Pressable
                  key={variant}
                  style={[
                    styles.variantButton,
                    selectedVariant ===
                    variant &&
                    styles.selectedVariantButton,
                  ]}
                  onPress={() =>
                    setSelectedVariant(
                      variant
                    )
                  }
                >
                  <Text
                    style={[
                      styles.variantText,
                      selectedVariant ===
                      variant &&
                      styles.selectedVariantText,
                    ]}
                  >
                    {variant}
                  </Text>
                </Pressable>
              )
            )}
          </View>

          <Text style={styles.emiTitle}>
            Choose EMI Plan
          </Text>

          {selectedProduct.emiPlans.map(
            (plan) => (
              <Pressable
                key={plan.months}
                style={[
                  styles.emiPlan,
                  selectedEmi ===
                  plan.months &&
                  styles.selectedEmiPlan,
                ]}
                onPress={() =>
                  setSelectedEmi(
                    plan.months
                  )
                }
              >
                <View>
                  <Text
                    style={
                      styles.emiPlanMonths
                    }
                  >
                    {plan.months} Months EMI
                  </Text>

                  <Text
                    style={
                      styles.emiPlanAmount
                    }
                  >
                    {plan.amount}
                  </Text>
                </View>

                {selectedEmi ===
                  plan.months && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={26}
                      color="#5B2C83"
                    />
                  )}
              </Pressable>
            )
          )}

          <Pressable
            style={styles.proceedButton}
            onPress={() => {
              if (!selectedVariant) {
                Alert.alert(
                  "Select Variant",
                  "Please select a product variant first."
                );
                return;
              }

              if (!selectedEmi) {
                Alert.alert(
                  "Select EMI Plan",
                  "Please select an EMI plan first."
                );
                return;
              }

              Alert.alert(
                "Selection Confirmed 🎉",
                `${selectedProduct.name}

Variant: ${selectedVariant}

EMI Plan: ${selectedEmi} Months`
              );
            }}
          >
            <Text
              style={
                styles.proceedButtonText
              }
            >
              Proceed with EMI
            </Text>
          </Pressable>
        </ScrollView>

        {/* FULL SCREEN IMAGE MODAL */}
        <Modal
          visible={isImageModalVisible}
          transparent={false}
          animationType="fade"
          onShow={() => {
            setTimeout(() => {
              imageScrollRef.current?.scrollTo({
                x:
                  selectedImageIndex *
                  SCREEN_WIDTH,
                animated: false,
              });
            }, 100);
          }}
          onRequestClose={() =>
            setIsImageModalVisible(false)
          }
        >
          <View
            style={
              styles.fullScreenImageContainer
            }
          >
            {/* CLOSE BUTTON */}
            <Pressable
              style={
                styles.closeImageButton
              }
              onPress={() =>
                setIsImageModalVisible(
                  false
                )
              }
            >
              <MaterialCommunityIcons
                name="close"
                size={32}
                color="#FFFFFF"
              />
            </Pressable>

            {/* IMAGE COUNTER */}
            {selectedProduct.images &&
              selectedProduct.images.length >
              1 && (
                <View
                  style={
                    styles.imageCounter
                  }
                >
                  <Text
                    style={
                      styles.imageCounterText
                    }
                  >
                    {selectedImageIndex + 1} /{" "}
                    {
                      selectedProduct.images
                        .length
                    }
                  </Text>
                </View>
              )}

            {/* SWIPEABLE IMAGES */}
            <ScrollView
              ref={imageScrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={
                false
              }
              decelerationRate="fast"
              onMomentumScrollEnd={(
                event
              ) => {
                const index =
                  Math.round(
                    event.nativeEvent
                      .contentOffset.x /
                    SCREEN_WIDTH
                  );

                setSelectedImageIndex(
                  index
                );
              }}
            >
              {selectedProduct.images?.map(
                (
                  image: any,
                  index: number
                ) => (
                  <View
                    key={index}
                    style={[
                      styles.fullScreenImageSlide,
                      {
                        width:
                          SCREEN_WIDTH,
                      },
                    ]}
                  >
                    <Image
                      source={image}
                      style={
                        styles.fullScreenImage
                      }
                    />
                  </View>
                )
              )}
            </ScrollView>
          </View>
        </Modal>
      </>
    );
  };

  const renderCurrentPage = () => {
    switch (activePage) {
      case "home":
        return renderHome();

      case "shop":
        return renderShop();

      case "emi":
        return renderEmi();

      case "limit":
        return renderLimit();

      case "profile":
        return renderProfile();

      case "productDetails":
        return renderProductDetails();

      default:
        return renderShop();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          Shop
        </Text>

        <Pressable
          style={styles.headerIcons}
        >
          <MaterialCommunityIcons
            name="cart-outline"
            size={30}
            color="#5B2C83"
          />
        </Pressable>
      </View>

      <View style={styles.mainContent}>
        {renderCurrentPage()}
      </View>

      <View style={styles.bottomNav}>
        <Pressable
          style={styles.navItem}
          onPress={() =>
            setActivePage("home")
          }
        >
          <MaterialCommunityIcons
            name={
              activePage === "home"
                ? "home"
                : "home-outline"
            }
            size={30}
            color={
              activePage === "home"
                ? "#5B2C83"
                : "#777"
            }
          />

          <Text
            style={[
              styles.navText,
              activePage === "home" &&
              styles.activeNavText,
            ]}
          >
            Home
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() =>
            setActivePage("shop")
          }
        >
          <MaterialCommunityIcons
            name={
              activePage === "shop"
                ? "store"
                : "store-outline"
            }
            size={30}
            color={
              activePage === "shop"
                ? "#5B2C83"
                : "#777"
            }
          />

          <Text
            style={[
              styles.navText,
              activePage === "shop" &&
              styles.activeNavText,
            ]}
          >
            Shop
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() =>
            setActivePage("emi")
          }
        >
          <MaterialCommunityIcons
            name="receipt-text-outline"
            size={30}
            color={
              activePage === "emi"
                ? "#5B2C83"
                : "#777"
            }
          />

          <Text
            style={[
              styles.navText,
              activePage === "emi" &&
              styles.activeNavText,
            ]}
          >
            EMI Dues
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() =>
            setActivePage("limit")
          }
        >
          <MaterialCommunityIcons
            name="chart-bar"
            size={30}
            color={
              activePage === "limit"
                ? "#5B2C83"
                : "#777"
            }
          />

          <Text
            style={[
              styles.navText,
              activePage === "limit" &&
              styles.activeNavText,
            ]}
          >
            Limit
          </Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() =>
            setActivePage("profile")
          }
        >
          <MaterialCommunityIcons
            name={
              activePage === "profile"
                ? "account"
                : "account-outline"
            }
            size={30}
            color={
              activePage === "profile"
                ? "#5B2C83"
                : "#777"
            }
          />

          <Text
            style={[
              styles.navText,
              activePage === "profile" &&
              styles.activeNavText,
            ]}
          >
            Profile
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7FA",
  },

  header: {
    height: 85,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  logo: {
    fontSize: 42,
    fontWeight: "800",
    color: "#252B38",
  },

  headerIcons: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#F1EDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  mainContent: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },

  shopScrollContent: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 120,
  },

  pageContent: {
    flex: 1,
  },

  heroCard: {
    backgroundColor: "#452275",
    borderRadius: 34,
    padding: 35,
    minHeight: 520,
    justifyContent: "center",
  },

  marketplaceLabel: {
    color: "#D7CADF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 30,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 50,
  },

  heroHighlight: {
    color: "#FFD34D",
  },

  heroSubtitle: {
    color: "#D8D0DF",
    fontSize: 18,
    lineHeight: 28,
    marginTop: 25,
  },

  exploreButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    paddingHorizontal: 25,
    paddingVertical: 20,
    marginTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  exploreButtonText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#3B3B50",
  },

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#EDECF1",
    borderRadius: 22,
    padding: 6,
    marginTop: 25,
    marginBottom: 25,
  },

  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 18,
  },

  activeTab: {
    backgroundColor: "#FFFFFF",
  },

  tabText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#777",
  },

  activeTabText: {
    color: "#5B2C83",
  },

  section: {
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#292738",
    marginBottom: 10,
  },

  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  productIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#F1EDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  productInfo: {
    flex: 1,
    marginLeft: 15,
  },

  productName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#292738",
  },

  productBrand: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },

  productPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#5B2C83",
  },

  pageTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#292738",
    marginBottom: 12,
  },

  pageSubtitle: {
    fontSize: 17,
    color: "#777",
    lineHeight: 25,
    marginBottom: 30,
  },

  homeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 25,
  },

  homeCardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#292738",
    marginTop: 20,
  },

  homeCardText: {
    fontSize: 16,
    color: "#777",
    lineHeight: 24,
    marginTop: 10,
  },

  primaryButton: {
    backgroundColor: "#5B2C83",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginTop: 25,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  emiCard: {
    backgroundColor: "#5B2C83",
    borderRadius: 25,
    padding: 28,
  },

  emiLabel: {
    color: "#D9CBE6",
    fontSize: 16,
  },

  emiAmount: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
    marginTop: 12,
  },

  emiDate: {
    color: "#FFFFFF",
    fontSize: 16,
    marginTop: 15,
  },

  limitCard: {
    backgroundColor: "#5B2C83",
    borderRadius: 25,
    padding: 28,
  },

  limitLabel: {
    color: "#D9CBE6",
    fontSize: 17,
  },

  limitAmount: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "800",
    marginTop: 10,
  },

  limitDivider: {
    height: 1,
    backgroundColor: "#80659D",
    marginVertical: 20,
  },

  limitUsed: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  infoTextContainer: {
    flex: 1,
    marginLeft: 15,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#292738",
  },

  infoText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
    lineHeight: 20,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    marginBottom: 25,
  },

  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F1EDF5",
    alignItems: "center",
    justifyContent: "center",
  },

  profileName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#292738",
    marginTop: 15,
  },

  profileEmail: {
    color: "#777",
    fontSize: 15,
    marginTop: 7,
  },

  profileOption: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  profileOptionText: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: "#292738",
    marginLeft: 15,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  loadingText: {
    fontSize: 16,
    color: "#5B2C83",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 16,
  },

  retryButton: {
    backgroundColor: "#5B2C83",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },

  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5B2C83",
    marginLeft: 8,
  },

  detailProductImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 20,
    backgroundColor: "#F1EDF5",
  },

  thumbnailScroll: {
    marginTop: 12,
    marginBottom: 16,
  },

  thumbnailButton: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 3,
  },

  selectedThumbnail: {
    borderColor: "#5B2C83",
    borderWidth: 2,
  },

  thumbnailImage: {
    width: 65,
    height: 65,
    borderRadius: 6,
  },

  detailProductName: {
    fontSize: 30,
    fontWeight: "800",
    color: "#292738",
  },

  detailProductBrand: {
    fontSize: 17,
    color: "#777",
    marginTop: 6,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },

  ratingText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#292738",
    marginLeft: 5,
  },

  reviewText: {
    fontSize: 14,
    color: "#777",
    marginLeft: 6,
  },

  detailProductPrice: {
    fontSize: 26,
    fontWeight: "800",
    color: "#5B2C83",
    marginTop: 15,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 8,
  },

  originalPrice: {
    fontSize: 15,
    color: "#777",
    textDecorationLine: "line-through",
  },

  discountText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#2E7D32",
    marginLeft: 12,
  },

  productDetailsTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#292738",
    marginTop: 22,
    marginBottom: 8,
  },

  productDetailsContainer: {
    marginBottom: 20,
  },

  productDetailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  productDetailBullet: {
    fontSize: 18,
    color: "#5B2C83",
    marginRight: 10,
    lineHeight: 24,
  },

  productDetailsText: {
    flex: 1,
    fontSize: 16,
    color: "#777",
    lineHeight: 24,
  },

  variantTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#292738",
    marginTop: 25,
    marginBottom: 12,
  },

  variantsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  variantButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F1EDF5",
    borderWidth: 1,
    borderColor: "#E0D8E8",
  },

  selectedVariantButton: {
    backgroundColor: "#5B2C83",
    borderColor: "#5B2C83",
  },

  variantText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#292738",
  },

  selectedVariantText: {
    color: "#FFFFFF",
  },

  emiTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#292738",
    marginTop: 25,
    marginBottom: 15,
  },

  emiPlan: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#E5E5E5",
  },

  selectedEmiPlan: {
    borderColor: "#5B2C83",
    backgroundColor: "#F7F1FB",
  },

  emiPlanMonths: {
    fontSize: 17,
    fontWeight: "700",
    color: "#292738",
  },

  emiPlanAmount: {
    fontSize: 15,
    color: "#777",
    marginTop: 5,
  },

  proceedButton: {
    backgroundColor: "#5B2C83",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
  },

  proceedButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  fullScreenImageContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },

  fullScreenImageSlide: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  closeImageButton: {
    position: "absolute",
    top: 55,
    right: 20,
    zIndex: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
  },

  imageCounter: {
    position: "absolute",
    top: 65,
    left: 20,
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },

  imageCounterText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  bottomNav: {
    height: 105,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 12,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  navText: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },

  activeNavText: {
    color: "#5B2C83",
    fontWeight: "800",
  },
});