module Handler.Input where
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE OverloadedStrings     #-}
{-# LANGUAGE QuasiQuotes           #-}
{-# LANGUAGE TemplateHaskell       #-}
{-# LANGUAGE TypeFamilies          #-}

import Data.Text as T
import Import
import Fmod9

getInputR :: Handler Html
getInputR = do
    roll <- runInputGet $ Roll
                <$> ireq doubleField "a"
                <*> ireq doubleField "b"
                <*> ireq doubleField "c"
                <*> ireq doubleField "d"

    defaultLayout $ do
        aDomId <- newIdent
        setTitle "Welcome To Yesod!"
        $(widgetFile "input")

