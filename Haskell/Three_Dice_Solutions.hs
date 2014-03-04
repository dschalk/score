import Data.List

choose n list = concatMap permutations $ choose' list [] where
  choose' []     r = if length r == n then [r] else []
  choose' (x:xs) r | length r == n = [r]
                   | otherwise     = choose' xs (x:r) 
                                  ++ choose' xs r
l3 = nub(choose 3 [6,4,4,2])
l4 = nub(choose 4 [6,4,4,2])

result xss = [[[x+y+z,x,y,z,0,0], [x-y+z,x,y,z,1,0], [x*y+z,x,y,z,2,0], [x*(y+z),x,y,z,2,0],
	[x+y-z,x,y,z,0,1], [x-y-z,x,y,z,1,1], [x*y-z,x,y,z,2,1], [x*(y-z),x,y,z,2,1],
	[x+y*z,x,y,z,0,2], [x-y*z,x,y,z,1,2], [x*y*z,x,y,z,2,2]]
	| [x,y,z]<-xss]

hits = [xs | xss <- result l3, xs <- xss, head xs == 20]
-- This selects solutions involving addition, subtraction, and multiplication.
-- The last two digits tell which operators were used. 
-- TO DO: include division and concatenation.  Write code for displaying the solution.
main = print $
	hits
	


