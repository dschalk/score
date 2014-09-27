{-# LANGUAGE OverloadedStrings #-}
module Fmod9 where

import Data.List
import Text.Julius
import Data.Text hiding (map, concat, null)
import Prelude
import System.Random
import System.IO.Unsafe

rN :: Int -> Double
rN x = fromIntegral(unsafePerformIO (getStdRandom (System.Random.randomR (1,x)) :: IO Int))

rN' x = unsafePerformIO (getStdRandom (System.Random.randomR (1,x)) :: IO Int)

fRound :: Double -> Int
fRound x = round x



notWhole :: Double -> Bool
notWhole x = fromIntegral (round x) /= x

ca :: Double -> Double -> Maybe Double
ca l m   | m < 0  = Nothing
          | notWhole l  = Nothing
          | notWhole m  = Nothing
          | otherwise  = Just (read (show (fromIntegral $ round l) ++ show (fromIntegral $ round m)) :: Double)

ct :: Maybe Double -> Double
ct Nothing = 3.1
ct (Just x) = x

cat :: Double -> Double -> Double
cat l m = ct (ca l m)

g :: (Double -> Double -> Double) -> String
g x         | x 3 2 == 5 = " + "
            | x 3 2 == 1 = " - "
            | x 3 2 == 6 = " * "
            | x 18 3 == 6 = " / "
            | x 5 5 == 55 = " concatenated left of "
            | otherwise = " cow "

f :: Double -> String
f x = show (round x)

scoreDiv :: (Eq a, Fractional a) => a -> a -> a
scoreDiv az bz  | bz == 0  = 99999
                | otherwise = (/) az bz

calc :: Double -> Double -> Double -> Double -> [(String, String, String, String, String)]
calc a b c d = [(f a', g op1, f b', g op2, f c') |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op2 (op1 a' b') c' == 20]

calc2 :: Double -> Double -> Double -> Double -> [(String, String, String, String, String)]
calc2 a b c d = [(f a', g op1, f b', g op2, f c') |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op2 a' (op1 b' c') == 20]

calc3 :: Double -> Double -> Double -> Double -> [(String, String, String, String, String, String, String)]
calc3 a b c d = [(f a', g op1, f b', g op3, f c', g op2, f d') |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 (op1 a' b') (op2 c' d') == 20]

calc4 :: Double -> Double -> Double -> Double -> [(String, String, String, String, String, String, String)]
calc4 a b c d = [(f a', g op1, f b', g op3, f c', g op2, f d') |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 (op2 (op1 a' b') c') d' == 20]

calc5 a b c d = [(f a', g op1, f b', g op3, f c', g op2, f d') |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 (op2 c' (op1 a' b')) d' == 20]

calc6 a b c d = [(f a', g op1, f b', g op3, f c', g op2, f d') |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 d' (op2 (op1 a' b') c') == 20]

calc7 a b c d = [(f a', g op1, f b', g op3, f c', g op2, f d') |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 d' (op2 c' (op1 a' b')) == 20]

h :: (String, String, String, String, String) -> String
h (a',b',c',d',e') = "(" ++ a' ++ b' ++ c' ++ ")" ++ d' ++ e' ++ " = 20, "

h2 :: (String, String, String, String, String) -> String
h2 (a',b',c',d',e') = a' ++ d' ++  "(" ++ c' ++ b' ++ e'++ ") = 20, "

h3 :: (String, String, String, String, String, String, String) -> String
h3 (a',b',c',d',e',f',g') = "(" ++ a' ++ b' ++ c' ++ ")"  ++ d' ++ "(" ++ e' ++ f' ++
                            g' ++ ") = 20, "

h4 :: (String, String, String, String, String, String, String) -> String
h4 (a',b',c',d',e',f',g') = "((" ++ a' ++ b' ++ c' ++ ")" ++
    f' ++ e' ++ ")" ++ d' ++ g' ++ ") = 20, "

h5 (a',b',c',d',e',f',g') = "(" ++ e' ++ f' ++ "(" ++ a' ++
  b' ++ c' ++ "))" ++ d' ++ g' ++ ") = 20, "

h6 (a',b',c',d',e',f',g') = g' ++ d' ++ "((" ++ a' ++ b' ++
  c' ++ ")" ++ f' ++ e' ++ ") = 20, "

h7 (a',b',c',d',e',f',g') = g' ++ d' ++ "(" ++ e' ++ f' ++
  "(" ++ a' ++ b' ++ c' ++ ")) = 20, "

pim x  | null x  = " -- There are no solutions in this category"
       | otherwise  = ""

cars a b c d = splitOn "," $ pack $ concat $ ((map h (calc a b c d)) ++ map h2 (calc2 a b c d) ++ map h3 (calc3 a b c d) ++ map h4 (calc4 a b c d)  ++
    map h5 (calc5 a b c d) ++ map h6 (calc6 a b c d) ++ map h7 (calc7 a b c d))
{-
    "Using the first number left of the result obtained from the second and third numbers." ++
    map h2 (calc2 a b c d) ++
    pim (calc2 a b c d) ++

    "Using the first two numbers and then the remaining two numbers, then using those results."++
    map h3 (calc3 a b c d) ++
    pim (calc3 a b c d) ++

    "Using the result from the first two numbers left of the third, then that result left of fourth number." ++
    map h4 (calc4 a b c d) ++
    pim (calc4 a b c d) ++

    "Using the third number left of the result obtained from the first two, then that result left of the fourth number." ++
    map h5 (calc5 a b c d) ++
    pim (calc5 a b c d) ++

    "Using the fourth number to the left of the result from using the first two numbers' result left of the third." ++
    map h6 (calc6 a b c d) ++
    pim (calc6 a b c d)     ++

    "Using the fourth number to the left of the result from using the third number left of the result from the first two." ++
    map h7 (calc7 a b c d) ++
    pim (calc7 a b c d) 
-}
main = print $ rN 20


