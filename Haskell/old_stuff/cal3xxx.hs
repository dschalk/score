{-# LANGUAGE TypeFamilies, QuasiQuotes, MultiParamTypeClasses,
             TemplateHaskell, OverloadedStrings #-}

import Prelude
import Yesod
import Yesod.Form
import Text.Jasmine (minifym)
import Text.Hamlet (hamletFile)
import Control.Applicative
import Fmod5

data Score = Score

instance Yesod Score

instance RenderMessage Score FormMessage where
    renderMessage _ _ = defaultFormMessage

mkYesod "Score" [parseRoutes|
/ HomeR GET
|]

-- show
data Calculation = Calculation Double Double Double Double

form = renderDivs $ Calculation
    <$> areq doubleField               "a" Nothing
    <*> areq doubleField               "b" Nothing
    <*> areq doubleField               "c" Nothing
    <*> areq doubleField               "d" Nothing

--getHomeR :: Handler sub Score RepHtml
getHomeR = do
    ((result, widget), enctype) <- runFormGet form

    let resultText = case result of
          FormSuccess (Calculation a b c d) -> do
                (   "<span id='mammoth'>" ++ show (round a) ++ " &nbsp;&nbsp; " ++ show (round b) ++ " &nbsp;&nbsp; " ++ show (round c) ++ " &nbsp;&nbsp; " ++ show (round d) ++ "</span>" ++
                    "<br>Three dice solutions:<br>" ++ 
                    "<span id='moose'>" ++ (eval a b c d) ++ (eval2 a b c d) ++ "</span>" ++
                    "<span id='mam'>" ++ pim ((map h (calc a b c d)) ++ (map h2 (calc2 a b c d))) ++ "</span>" ++
                    "<br>The results of two separate calculations used to achieve the final result:<br> " ++ 
                    "<span id='moose'>" ++ (eval3 a b c d) ++ "</span>" ++
                    "<span id='mam'>" ++ pim ((map h3 (calc3 a b c d))) ++ "</span>" ++
                    "<br>Calculations performed sequentially from left to right:<br> " ++ 
                    "<span id='moose'>" ++ (eval4 a b c d) ++ "</span>" ++
                    "<span id='mam'>" ++ pim ((map h4 (calc4 a b c d))) ++ "</span>" ++
                    "<br>Central numbers combined, then the left number is used, and then the number on the far right is used:<br> " ++ 
                    "<span id='moose'>" ++ (eval5 a b c d) ++ "</span>" ++
                    "<span id='mam'>" ++ pim ((map h5 (calc5 a b c d))) ++ "</span>" ++
                    "<br>Central numbers combined, then the right number is used, and then the number on the far left is used:<br> " ++ 
                    "<span id='moose'>" ++ (eval6 a b c d) ++ "</span>" ++
                    "<span id='mam'>" ++ pim ((map h6 (calc6 a b c d))) ++ "</span>" ++
                    "<br>Calculations performed sequentially from right to left:<br> " ++ 
                    "<span id='moose'>" ++ (eval7 a b c d)) ++ "</span>" ++
                    "<span id='mam'>" ++ pim ((map h7 (calc7 a b c d))) ++ "</span>"
          _ -> ""

    defaultLayout $ do
        [whamlet|
            <br>
            <div id="title"> Score! </div>
            <br>
            <br>
            <span id="turtles"> Experiment: </span>
            <br>
            <br>
            <form>
                <input type="hidden" name="_hasdata">
                <span class="required ">             
                    <input class="cow"  name="f2" type="number" step="any" value="" >
                <span class="required ">
                    <input class="cow"  name="f3" type="number" step="any"  value="" >
                <span class="required ">
                    <input class="cow"  name="f4" type="number" step="any"  value="" >
                <span class="required ">
                    <input class="cow"  name="f5" type="number" step="any"  value="" >
                    <br>
                <input #button type="submit" value="Calculate!">
                <br>
                <br>
            <div> #{preEscapedToMarkup resultText}
          |]
        toWidget [cassius|
            body 
                width: 65em
                margin: 0em auto
                background-color:black
                color:#D2FFFF 
            #mammoth
                color:#FF7560
            #mam
                color:#A0FF9A
            #moose
                color: #FF495F
            #button
                width: 7em
                margin-left:2em
                margin-top:1em
                color:#FFF55C
                background-color:#FF495F
            #title          
                color: #F70202
                text-align: center
                font-size: 50px
            #turtles
                color: #F70202
                text-align: loft
                margin-left: 4px
                font-size: 25px

            .cow
                background-color:#D2FFA5
                color:#FF0000
                width: 4em
            .cows
                background-color:#D2FFA5
                color:#FF0000
                width: 4em
                text-align: center
                font-size: 18px
            .goats
                background-color:#D2FFA5
                color:#FF0000
                width: 6em
                text-align: center
                font-size: 18px
            .required
                text-align: right
          |]
        [whamlet|
            <br>
            <br>
            <span id="turtles">Play:</span>
            <br>
            <br>
            <form>
                <input type="hidden" name="_hasdata">
                <span class="required ">
                    <input class="cow"  name="f6" type="number" step="any" value="" >
                <span class="required ">
                    <input class="cow"  name="f7" type="number" step="any"  value="" >
                <span class="required ">
                    <input class="cow"  name="f8" type="number" step="any"  value="" >
                <span class="required ">
                    <input class="cow"  name="f9" type="number" step="any"  value="" >
                    <br>
                                    <span class="required ">
                    <input class="cows"  name="f10" type="text" step="any" value="+" >
                <span class="required ">
                    <input class="cows"  name="f11" type="text" step="any"  value="-" >
                <span class="required ">
                    <input class="cows"  name="f12" type="text" step="any"  value="*" >
                <span class="required ">
                    <input class="cows"  name="f13" type="text" step="any"  value="/" >
                <span class="required ">
                    <input class="goats"  name="f14" type="text" step="any"  value="Concat" >
                    <br>
                                    <span class="required ">
                    <input class="cow"  name="f15" type="number" step="any" value="" >
                <span class="required ">
                    <input class="cow"  name="f16" type="number" step="any"  value="" >
                <span class="required ">
                    <input class="cow"  name="f17" type="number" step="any"  value="" >
                <span class="required ">
                    <input class="cow"  name="f9" type="number" step="any"  value="" >
                    <br>
                <input #button type="submit" value="Score!">
                <br>
                <br>
          |]

eval a b c d = concat (map h (calc a b c d))
eval2 a b c d = concat (map h2 (calc2 a b c d))
eval3 a b c d = concat (map h3 (calc3 a b c d))
eval4 a b c d = concat (map h4 (calc4 a b c d))
eval5 a b c d = concat (map h5 (calc5 a b c d))
eval6 a b c d = concat (map h6 (calc6 a b c d))
eval7 a b c d = concat (map h7 (calc7 a b c d))

main :: IO ()
main = do
warp 3001 Score
