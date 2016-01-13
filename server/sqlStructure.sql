-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Gegenereerd op: 27 okt 2015 om 16:16
-- Serverversie: 5.5.42
-- PHP-versie: 5.5.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `fundispenser_local`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `players`
--

CREATE TABLE `players` (
  `playerId` int(11) NOT NULL,
  `playerName` varchar(45) DEFAULT NULL,
  `tagId` varchar(45) DEFAULT NULL,
  `experience` int(11) DEFAULT NULL,
  `levelId` int(11) NOT NULL,
  `flavourId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `players`
--

INSERT INTO `players` (`playerId`, `playerName`, `tagId`, `experience`, `levelId`, `flavourId`) VALUES
(1, 'Niek Eichner', '04C0', 0, 1, 1),
(4, 'Chinji Hoe', '0496', 0, 1, 1);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`playerId`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `players`
--
ALTER TABLE `players`
  MODIFY `playerId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `fk_players_flavours` FOREIGN KEY (`flavourId`) REFERENCES `flavours` (`flavourId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_players_levels1` FOREIGN KEY (`levelId`) REFERENCES `levels` (`levelId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
