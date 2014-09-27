module Fmod5 where
import Data.List
-- Edited in emacs
isNotInt :: (Integral a, RealFrac b) => b -> a -> Bool
isNotInt x n = (round $ 10^(fromIntegral n)*(x-(fromIntegral $ round x)))/=0

cat :: (RealFrac a, RealFrac a1) => a -> a1 -> Double
cat l m   | m < 0  = 55555
          | isNotInt l 3  = 565656
          | isNotInt m 3  = 676767
          | otherwise  = read (show (fromIntegral $ round l) ++ show (fromIntegral $ round m))

g :: (Eq a3, Num a, Num a1, Num a3, Num a2) => (a -> a1 -> a3) -> a2
g x         | x 3 2 == 5 = 1000
            | x 3 2 == 1 = 2000
            | x 3 2 == 6 = 3000
            | x 18 3 == 6 = 4000
            | x 5 5 == 55 = 5000
            | otherwise = 6000

f :: Double -> String
f x         | x == 1000 = " + "
            | x == 2000 = " - "
            | x == 3000 = " * "
            | x == 4000 = " / "
            | x == 5000 = " concatenated left of "
            | otherwise = " cow "

scoreDiv :: (Eq a, Fractional a) => a -> a -> a
scoreDiv az bz  | bz == 0  = 99999
                 | otherwise = (/) az bz

calc :: Double -> Double -> Double -> Double -> [[Double]]
calc a b c d = [[a', g op1, b', g op2, c'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op2 (op1 a' b') c' == 20]

calc2 :: Double -> Double -> Double -> Double -> [[Double]]
calc2 a b c d = [[a', g op1, b', g op2, c'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op2 a' (op1 b' c') == 20]

calc3 :: Double -> Double -> Double -> Double -> [[Double]]
calc3 a b c d = [[a', g op1, b', g op3, c', g op2, d'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 (op1 a' b') (op2 c' d') == 20]

calc4 :: Double -> Double -> Double -> Double -> [[Double]]
calc4 a b c d = [[a', g op1, b', g op3, c', g op2, d'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 (op2 (op1 a' b') c') d' == 20]

calc5 :: Double -> Double -> Double -> Double -> [[Double]]
calc5 a b c d = [[a', g op1, b', g op3, c', g op2, d'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 (op2 c' (op1 a' b')) d' == 20]

calc6 :: Double -> Double -> Double -> Double -> [[Double]]
calc6 a b c d = [[a', g op1, b', g op3, c', g op2, d'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 d' (op2 (op1 a' b') c') == 20]

calc7 :: Double -> Double -> Double -> Double -> [[Double]]
calc7 a b c d = [[a', g op1, b', g op3, c', g op2, d'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 d' (op2 c' (op1 a' b')) == 20]

h [a',b',c',d',e'] = "(" ++ show (round a') ++ f b' ++  show (round c') ++ ")" ++ f d' ++ show (round e') ++ " = 20" ++ "<br>"

h2 [a',b',c',d',e'] = show (round a') ++ f d' ++  "(" ++ show (round c') ++ f b' ++ show (round e')++ ") = 20" ++ "<br>"

h3 [a',b',c',d',e',f',g'] = "(" ++ show (round a') ++ f b' ++ show (round c') ++ ")"  ++ f d' ++ "(" ++ show (round e') ++ f f' ++
                            show (round g') ++ ") = 20" ++ "<br>"

h4 [a',b',c',d',e',f',g'] = "((" ++ show (round a') ++ f b' ++ show (round c') ++ ")" ++
    f f' ++ show (round e') ++ ")" ++ f d' ++ show (round g') ++ ") = 20" ++ "<br>"

h5 [a',b',c',d',e',f',g'] = "(" ++ show (round e') ++ f f' ++ "(" ++ show (round a') ++
  f b' ++ show (round c') ++ "))" ++ f d' ++ show (round g') ++ ") = 20" ++ "<br>"

h6 [a',b',c',d',e',f',g'] = show (round g') ++ f d' ++ "((" ++ show (round a') ++ f b' ++
  show (round c') ++ ")" ++ f f' ++ show (round e') ++ ") = 20" ++ "<br>"

h7 [a',b',c',d',e',f',g'] = show (round g') ++ f d' ++ "(" ++ show (round e') ++ f f' ++
  "(" ++ show (round a') ++ f b' ++ show (round c') ++ ")) = 20" ++ "<br>"

pim x  | x == []  = " -- There are no solutions in this category<br>"
       | otherwise  = []     


