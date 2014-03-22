import Data.List

isNotInt :: (Integral a, RealFrac b) => b -> a -> Bool
isNotInt x n = (round $ 10^(fromIntegral n)*(x-(fromIntegral $ round x)))/=0

cat :: (RealFrac a, RealFrac a1) => a -> a1 -> Double
cat l m   | m < 0  = 55555
          | isNotInt l 3  = 565656
          | isNotInt m 3  = 676767
          | otherwise  = read (show (fromIntegral $ round l) ++ show (fromIntegral $ round m))

g :: (Eq a3, Num a, Num a1, Num a3, Num a2) => (a -> a1 -> a3) -> a2
g x 	| x 3 2 == 5 = 1000
		  | x 3 2 == 1 = 2000
		  | x 3 2 == 6 = 3000
		  | x 18 3 == 6 = 4000
		  | x 5 5 == 55 = 5000
		  | otherwise = 6000

f :: Double -> String
f x  		| x == 1000 = " + "
			| x == 2000 = " - "
			| x == 3000 = " * "
			| x == 4000 = " / "
			| x == 5000 = " concatenated left of "
			| otherwise = " cow "

scoreDiv az bz    | bz == 0  = 99999
                  | otherwise = (/) az bz

calc :: Double -> Double -> Double -> Double -> [[Double]]
calc a b c d = [[a', g op1, b', g op2, c'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op2 (op1 a' b') c' == 20]

calc2 :: Double -> Double -> Double -> Double -> [[Double]]
calc2 a b c d = [[a', g op1, b', g op3, c', g op2, d'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 (op1 a' b') (op2 c' d') == 20]

calc3 :: Double -> Double -> Double -> Double -> [[Double]]
calc3 a b c d = [[a', g op1, b', g op3, c', g op2, d'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 (op2 (op1 a' b') c') d' == 20]

calc4 :: Double -> Double -> Double -> Double -> [[Double]]
calc4 a b c d = [[a', g op1, b', g op3, c', g op2, d'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 (op2 c' (op1 a' b')) d' == 20]

calc5 :: Double -> Double -> Double -> Double -> [[Double]]
calc5 a b c d = [[a', g op1, b', g op3, c', g op2, d'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 d' (op2 (op1 a' b') c') == 20]

calc6 :: Double -> Double -> Double -> Double -> [[Double]]
calc6 a b c d = [[a', g op1, b', g op3, c', g op2, d'] |
                        [a',b',c',d'] <- nub(permutations [a,b,c,d]),
                            op1 <- [cat, (+), (-), (*), scoreDiv],
                            op2 <- [cat, (+), (-), (*), scoreDiv],
                            op3 <- [cat, (+), (-), (*), scoreDiv],
                            op3 d' (op2 c' (op1 a' b')) == 20]


h :: [Double] -> [Char]
h [a',b',c',d',e'] = "(" ++ show a' ++ f b' ++ show c' ++ ")" ++ f d' ++ show e' ++ " = " ++ show 20                            

removeBr :: [[a]] -> [a]
removeBr [] = []
removeBr (xs:xss) = xs ++ removeBr xss

h2 :: [Double] -> String
h2 [a',b',c',d',e',f',g'] = "(" ++ show (fromIntegral $ round a') ++ f b' ++ show (fromIntegral $ round c') ++ ")" ++ f d'++
                           "(" ++ show (fromIntegral $ round e') ++ f f' ++ show (fromIntegral $ round g') ++ ") = 20"

h3 :: [Double] -> String
h3 [a',b',c',d',e',f',g'] = "((" ++ show (fromIntegral $ round a') ++ f b' ++ show (fromIntegral $ round c') ++ ")" ++ 
    f f' ++ show (fromIntegral $ round e') ++ ")" ++ f d' ++ show (fromIntegral $ round g') ++ ") = 20"

h4 :: [Double] -> String
h4 [a',b',c',d',e',f',g'] = "(" ++ show (fromIntegral $ round e') ++ f f' ++ "(" ++ show (fromIntegral $ round a') ++ 
  f b' ++ show (fromIntegral $ round c') ++ "))" ++ f d' ++ show (fromIntegral $ round g') ++ ") = 20"

h5 :: [Double] -> String
h5 [a',b',c',d',e',f',g'] = show (fromIntegral $ round g') ++ f d' ++ "((" ++ show (fromIntegral $ round a') ++ f b' ++ 
  show (fromIntegral $ round c') ++ ")" ++ f f' ++ show (fromIntegral $ round e') ++ ") = 20"

h6 :: [Double] -> String
h6 [a',b',c',d',e',f',g'] = show (fromIntegral $ round g') ++ f d' ++ "(" ++ show (fromIntegral $ round e') ++ f f' ++ 
  "(" ++ show (fromIntegral $ round a') ++ f b' ++ show (fromIntegral $ round c') ++ ")) = 20"

main :: IO ()
main = do
    putStrLn "First die.  Please enter a number between 1 and 6."
    line <- getLine
    let a = read line :: Double
    putStrLn "Second die.  Please enter another number between 1 and 6."
    line2 <- getLine
    let b = read line2 :: Double
    putStrLn "Now enter a number between 1 and 12"
    line3 <- getLine
    let c = read line3 :: Double
    putStrLn "Finally, please enter a number between 1 and 20."
    line4 <- getLine
    let d = read line4 :: Double
    putStrLn ("Three-dice solutions:")
    mapM_ putStrLn $ map h (calc a b c d)
    putStrLn "Solutions involving two discrete initial computations and then a final computation using those results: "
    mapM_  (putStrLn.h2) (calc2 a b c d)
    putStrLn "Other four-dice solutions that exist: "
    mapM_  (putStrLn.h3) (calc3 a b c d)
    putStrLn "**************************************************"
    mapM_  (putStrLn.h4) (calc4 a b c d)
    putStrLn "**************************************************"
    mapM_  (putStrLn.h5) (calc5 a b c d)
    putStrLn "**************************************************"
    mapM_  (putStrLn.h6) (calc6 a b c d)

