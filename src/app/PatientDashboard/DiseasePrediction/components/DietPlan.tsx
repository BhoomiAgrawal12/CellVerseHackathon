'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Apple, XCircle, Coffee, ArrowLeft } from 'lucide-react';

interface DietPlanProps {
  prediction: {
    disease: string;
    confidence: number;
    description: string;
    recommendations: string[];
  };
  patientInfo: any;
  onBack: () => void;
}

const DietPlan: React.FC<DietPlanProps> = ({ prediction, patientInfo, onBack }) => {
  // Generate recommended foods based on condition
  const getRecommendedFoods = () => {
    const baseFoods = [
      {
        name: "Leafy Greens",
        benefits: "Rich in vitamins, minerals, and antioxidants",
        examples: "Spinach, kale, collard greens, arugula"
      },
      {
        name: "Berries",
        benefits: "High in antioxidants and fiber",
        examples: "Blueberries, strawberries, raspberries"
      },
      {
        name: "Fatty Fish",
        benefits: "Rich in omega-3 fatty acids",
        examples: "Salmon, mackerel, sardines"
      },
      {
        name: "Nuts and Seeds",
        benefits: "Good source of healthy fats and protein",
        examples: "Almonds, walnuts, chia seeds, flaxseeds"
      }
    ];
    
    // Add condition-specific foods
    if (prediction.disease === "Common Cold") {
      return [
        ...baseFoods,
        {
          name: "Citrus Fruits",
          benefits: "High in vitamin C to support immune function",
          examples: "Oranges, grapefruits, lemons"
        },
        {
          name: "Garlic",
          benefits: "Has antimicrobial and immune-boosting properties",
          examples: "Fresh garlic in cooking or supplements"
        },
        {
          name: "Honey",
          benefits: "Soothes sore throat and may have antimicrobial properties",
          examples: "Raw, unprocessed honey in warm tea"
        }
      ];
    } else if (prediction.disease === "Seasonal Allergies") {
      return [
        ...baseFoods,
        {
          name: "Turmeric",
          benefits: "Contains curcumin which has anti-inflammatory properties",
          examples: "Turmeric tea, added to curries or smoothies"
        },
        {
          name: "Ginger",
          benefits: "Has anti-inflammatory and antihistamine properties",
          examples: "Fresh ginger in tea or cooking"
        },
        {
          name: "Onions and Apples",
          benefits: "Contain quercetin, a natural antihistamine",
          examples: "Raw or cooked onions, fresh apples with skin"
        }
      ];
    } else if (prediction.disease === "Migraine") {
      return [
        ...baseFoods,
        {
          name: "Magnesium-rich Foods",
          benefits: "May help prevent migraine attacks",
          examples: "Dark chocolate, avocados, bananas, whole grains"
        },
        {
          name: "Riboflavin-rich Foods",
          benefits: "May reduce migraine frequency",
          examples: "Eggs, dairy products, lean meats, green vegetables"
        },
        {
          name: "Omega-3 Fatty Acids",
          benefits: "May reduce inflammation and migraine frequency",
          examples: "Fatty fish, flaxseeds, walnuts"
        }
      ];
    }
    
    return baseFoods;
  };

  // Generate foods to avoid based on condition
  const getFoodsToAvoid = () => {
    const baseFoodsToAvoid = [
      {
        name: "Processed Foods",
        reason: "High in sodium, unhealthy fats, and additives",
        examples: "Fast food, packaged snacks, frozen meals"
      },
      {
        name: "Added Sugars",
        reason: "Can cause inflammation and energy crashes",
        examples: "Sodas, candy, pastries, many breakfast cereals"
      }
    ];
    
    // Add condition-specific foods to avoid
    if (prediction.disease === "Common Cold") {
      return [
        ...baseFoodsToAvoid,
        {
          name: "Dairy Products",
          reason: "May increase mucus production",
          examples: "Milk, cheese, yogurt"
        },
        {
          name: "Alcohol",
          reason: "Can dehydrate the body and weaken immune function",
          examples: "Beer, wine, spirits"
        }
      ];
    } else if (prediction.disease === "Seasonal Allergies") {
      return [
        ...baseFoodsToAvoid,
        {
          name: "Histamine-rich Foods",
          reason: "May worsen allergy symptoms",
          examples: "Aged cheeses, fermented foods, wine, beer"
        },
        {
          name: "Sulfites",
          reason: "May trigger symptoms in some people",
          examples: "Wine, dried fruits, preserved foods"
        }
      ];
    } else if (prediction.disease === "Migraine") {
      return [
        ...baseFoodsToAvoid,
        {
          name: "Tyramine-rich Foods",
          reason: "Known migraine triggers for many people",
          examples: "Aged cheeses, cured meats, fermented foods"
        },
        {
          name: "Caffeine",
          reason: "Can trigger migraines in some people, especially with inconsistent consumption",
          examples: "Coffee, tea, energy drinks, chocolate"
        },
        {
          name: "Artificial Sweeteners",
          reason: "Particularly aspartame, which may trigger migraines",
          examples: "Diet sodas, sugar-free products, some medications"
        },
        {
          name: "MSG",
          reason: "Common migraine trigger",
          examples: "Some restaurant foods, processed meats, flavor enhancers"
        }
      ];
    }
    
    return baseFoodsToAvoid;
  };

  // Generate meal plan suggestions
  const getMealPlanSuggestions = () => {
    // Base meal plan
    const baseMealPlan = {
      breakfast: "Oatmeal with berries and nuts, green tea",
      lunch: "Quinoa salad with mixed vegetables and lean protein",
      dinner: "Baked fish with steamed vegetables and brown rice",
      snacks: "Fresh fruit, handful of nuts, vegetable sticks with hummus"
    };
    
    // Customize based on condition
    if (prediction.disease === "Common Cold") {
      return {
        breakfast: "Warm oatmeal with honey and cinnamon, herbal tea with lemon",
        lunch: "Vegetable soup with garlic and ginger, whole grain bread",
        dinner: "Baked chicken with turmeric, steamed vegetables, brown rice",
        snacks: "Orange slices, warm broth, herbal tea with honey"
      };
    } else if (prediction.disease === "Seasonal Allergies") {
      return {
        breakfast: "Smoothie with berries, spinach, and flaxseeds",
        lunch: "Quinoa bowl with roasted vegetables and turmeric dressing",
        dinner: "Salmon with ginger, broccoli, and sweet potato",
        snacks: "Apple slices, pineapple chunks, herbal tea with local honey"
      };
    } else if (prediction.disease === "Migraine") {
      return {
        breakfast: "Whole grain toast with avocado, boiled egg, decaffeinated tea",
        lunch: "Spinach salad with grilled chicken, olive oil dressing, and seeds",
        dinner: "Baked salmon with brown rice and steamed vegetables",
        snacks: "Banana, small piece of dark chocolate, almonds"
      };
    }
    
    return baseMealPlan;
  };

  const recommendedFoods = getRecommendedFoods();
  const foodsToAvoid = getFoodsToAvoid();
  const mealPlan = getMealPlanSuggestions();

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-emerald-500 to-yellow-500 py-6 px-8">
          <h2 className="text-2xl font-bold text-white">Nutrition & Diet Plan</h2>
          <p className="text-emerald-50">Personalized dietary recommendations for {prediction.disease}</p>
        </div>
        
        <div className="p-8">
          {/* Recommended Foods */}
          <motion.section 
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <Apple size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Recommended Foods</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendedFoods.map((food, index) => (
                <motion.div 
                  key={index}
                  className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-lg font-semibold text-emerald-700 mb-2">{food.name}</h4>
                  <p className="text-gray-700 mb-3">{food.benefits}</p>
                  <div className="bg-white p-3 rounded-lg text-sm text-gray-600">
                    <span className="font-medium text-emerald-600">Examples: </span>
                    {food.examples}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* Foods to Avoid */}
          <motion.section 
            className="mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <XCircle size={24} className="text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Foods to Avoid or Limit</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {foodsToAvoid.map((food, index) => (
                <motion.div 
                  key={index}
                  className="bg-red-50 rounded-xl p-6 border border-red-100 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-lg font-semibold text-red-700 mb-2">{food.name}</h4>
                  <p className="text-gray-700 mb-3">{food.reason}</p>
                  <div className="bg-white p-3 rounded-lg text-sm text-gray-600">
                    <span className="font-medium text-red-600">Examples: </span>
                    {food.examples}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          {/* Sample Meal Plan */}
          <motion.section 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center mb-6">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Utensils size={24} className="text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Sample Meal Plan</h3>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="bg-white rounded-lg p-5 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center mb-3">
                    <Coffee size={20} className="text-amber-500 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-800">Breakfast</h4>
                  </div>
                  <p className="text-gray-700">{mealPlan.breakfast}</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-lg p-5 shadow-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex items-center mb-3">
                    <Utensils size={20} className="text-amber-500 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-800">Lunch</h4>
                  </div>
                  <p className="text-gray-700">{mealPlan.lunch}</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-lg p-5 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <div className="flex items-center mb-3">
                    <Utensils size={20} className="text-amber-500 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-800">Dinner</h4>
                  </div>
                  <p className="text-gray-700">{mealPlan.dinner}</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-lg p-5 shadow-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <div className="flex items-center mb-3">
                    <Apple size={20} className="text-amber-500 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-800">Snacks</h4>
                  </div>
                  <p className="text-gray-700">{mealPlan.snacks}</p>
                </motion.div>
              </div>
            </div>
          </motion.section>
          
          {/* Hydration Tips */}
          <motion.section 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">Hydration Tips</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-0.5">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Aim for 8-10 glasses of water daily</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-0.5">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Herbal teas can count toward your daily fluid intake</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-0.5">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Limit caffeine and alcohol as they can cause dehydration</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-white p-1 rounded-full mr-3 mt-0.5">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">Increase water intake during hot weather or when exercising</span>
                </li>
              </ul>
            </div>
          </motion.section>
          
          {/* Important Note */}
          <motion.div 
            className="bg-amber-50 p-6 rounded-xl border border-amber-100 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <h4 className="text-lg font-semibold text-amber-700 mb-2">Important Note</h4>
            <p className="text-amber-700">
              This diet plan is a general recommendation based on your condition. Individual nutritional needs may vary. 
              Consider consulting with a registered dietitian for a personalized nutrition plan, especially if you have 
              specific dietary restrictions, allergies, or other health conditions.
            </p>
          </motion.div>
          
          {/* Navigation Button */}
          <motion.div 
            className="flex justify-start mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <motion.button
              onClick={onBack}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg flex items-center transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="mr-2" size={18} />
              Back to Lifestyle Recommendations
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DietPlan;