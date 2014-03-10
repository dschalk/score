import Data.List 

cat :: (Show a, Show a1) => a -> a1 -> Integer
cat a b  = read (show a ++ show b)

g x 	| x 3 2 == 5 = 1000
		| x 3 2 == 1 = 2000
		| x 3 2 == 6 = 3000
		| x 12 6 == 2 = 4000
		| x 5 5 == 55 = 5000
		| otherwise = 6000

f :: Integer -> [Char]
f x  		| x == 1000 = " + "
			| x == 2000 = " - "
			| x == 3000 = " * "
			| x == 4000 = " / "
			| x == 5000 = " concatenated left of "
			| otherwise = " cow "	


score_div az bz	|	mod az bz == 0	= div az bz
				| 	otherwise = 888

calc hx ix jx kx = [[a, g op1, b, g op2, c] | [a,b,c,_] <- nub(permutations [hx,ix,jx,kx]), op1 <- [cat, (+), (-), (*), score_div], op2 <- [cat, (+), (-), (*), score_div],
	(op2 (op1 a b) c) == 20]

h [a,b,c,d,e] = "(" ++ show a ++ f b ++ show c ++ ")" ++ f d ++ show e ++ " = 20"

l = nub(permutations [2,4,6,8])
ladd = calc 2 4 6 8
clock = map h ladd

score alfa beta gamma py = map h (calc alfa gamma beta py)

main = do 
	mapM_ putStrLn $ score 2 4 6 8


