-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mag 28, 2023 alle 19:44
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flork`
--

DELIMITER $$
--
-- Procedure
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `followandfollower` (IN `utente` INT)   begin

declare variabile int;
set variabile=(select count(id) from follow where utente2=utente);

drop table if exists temp;
create temporary table temp(
    id int,
    follower int,
    follows int
    );


insert into temp
select id,variabile,count(id) from follow where utente1=utente;

end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Struttura della tabella `commento`
--

CREATE TABLE `commento` (
  `id` int(11) NOT NULL,
  `testo` varchar(200) DEFAULT NULL,
  `idutente` int(11) DEFAULT NULL,
  `idpost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `commento`
--

INSERT INTO `commento` (`id`, `testo`, `idutente`, `idpost`) VALUES
(11, 'Io ci sono, fatemi sapere a che ora', 18, 75),
(12, 'Posso unirmi?', 24, 75),
(13, 'Si e non sei tu!', 23, 77),
(15, 'Il mio re!', 13, 78),
(16, 'Volentieri, alle 10 in via Plebiscito', 13, 75),
(18, 'Intendi Gagliardini?', 13, 77),
(20, 'Ma quanto sei forte?', 13, 78),
(38, 'Hai ragione! Ci rifaremo presto', 31, 82),
(39, 'Scusateci tifosi!', 31, 83),
(40, 'Siete un po\' indietro! Inguardabili', 32, 83),
(41, 'Complimenti, ma io ne ho 7!', 33, 85),
(42, 'Tiratela meno che la prossima ti accompagno al muro', 33, 84),
(43, 'Vi facciamo Compagnia', 33, 83),
(44, 'Complimenti campione', 13, 85),
(45, 'Potrebbe esserlo', 13, 76),
(48, 'qweqwe', 13, 75),
(49, 'qweqwe', 13, 75);

-- --------------------------------------------------------

--
-- Struttura della tabella `follow`
--

CREATE TABLE `follow` (
  `id` int(11) NOT NULL,
  `utente1` int(11) DEFAULT NULL,
  `utente2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `follow`
--

INSERT INTO `follow` (`id`, `utente1`, `utente2`) VALUES
(267, 24, 13),
(268, 24, 16),
(270, 14, 23),
(271, 15, 23),
(272, 16, 23),
(273, 17, 23),
(274, 18, 23),
(275, 19, 23),
(276, 20, 23),
(277, 21, 23),
(278, 22, 23),
(279, 23, 24),
(386, 13, 24),
(387, 13, 23),
(388, 34, 33),
(389, 34, 23),
(390, 34, 24),
(391, 34, 32),
(392, 34, 31),
(394, 13, 32),
(395, 13, 31),
(396, 13, 33),
(397, 13, 30),
(398, 31, 13),
(399, 31, 24),
(400, 31, 23),
(401, 31, 18),
(402, 31, 17),
(403, 32, 33),
(404, 32, 31),
(405, 33, 32),
(406, 33, 31),
(407, 13, 14),
(408, 13, 34),
(412, 13, 18);

-- --------------------------------------------------------

--
-- Struttura della tabella `likee`
--

CREATE TABLE `likee` (
  `id` int(11) NOT NULL,
  `utente` int(11) DEFAULT NULL,
  `idpost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `likee`
--

INSERT INTO `likee` (`id`, `utente`, `idpost`) VALUES
(7, 18, 75),
(8, 24, 75),
(9, 23, 78),
(12, 18, 78),
(63, 13, 76),
(75, 13, 77),
(79, 13, 78),
(81, 13, 82),
(83, 31, 82),
(84, 31, 83),
(85, 32, 83),
(86, 33, 84),
(87, 33, 85),
(88, 13, 85),
(89, 13, 84);

-- --------------------------------------------------------

--
-- Struttura della tabella `newssalvate`
--

CREATE TABLE `newssalvate` (
  `id` int(11) NOT NULL,
  `titolo` varchar(200) DEFAULT NULL,
  `descrizione` varchar(600) DEFAULT NULL,
  `immagine` varchar(200) DEFAULT NULL,
  `link` varchar(200) DEFAULT NULL,
  `idutente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `newssalvate`
--

INSERT INTO `newssalvate` (`id`, `titolo`, `descrizione`, `immagine`, `link`, `idutente`) VALUES
(37, 'Palermo, morto l’avvocato Crescimanno: difese le famiglie di Falcone e Borsellino...', 'È morto martedì pomeriggio a Palermo, all’età di 81 anni, l’avvocato Francesco Crescimanno, amico di Giovanni Falcone e Paolo Borsellino e difensore di parte civile per le loro famiglie nei processi per le stragi di Capaci e via D’Amelio, di cui i due magistrati rimasero vittime. Si è spento proprio...', 'https://st.ilfattoquotidiano.it/wp-content/uploads/2020/01/09/tribunale-palermo1200-1050x551.jpg', 'https://www.ilfattoquotidiano.it/2023/05/23/palermo-morto-lavvocato-crescimanno-difese-le-famiglie-di-falcone-e-borsellino/7171302/', 18),
(38, 'Brianza, tentativo di rapimento di una bimba di 8 anni: “Una donna col velo ha cercato di portarla v...', 'Correzzana, dopo il caso di Milano arriva la denuncia di una mamma ai carabinieri: “Hanno tentato di caricare in macchina mia figlia, è stata salvata dalle amiche più grandi”...', 'elementi/noimage.jpg', 'https://www.ilgiorno.it/cronaca/brianza-tentativo-di-rapimento-di-una-bimba-di-8-anni-una-donna-col-velo-ha-cercato-di-portarla-via-f8bf60b5', 24),
(39, 'Iliad irrompe ancora sul mercato: l’offerta che cambierà ogni cosa per i clienti...', 'La marcia inarrestabile di Iliad continua. L’azienda ormai leader del settore mobile e non solo lancia la nuova attesissima offerta. Il mondo della telefonia, soprattutto ... Leggi tutto L\'articolo Iliad irrompe ancora sul mercato: l’offerta che cambierà ogni cosa per i clienti proviene da ContoCorr...', 'elementi/noimage.jpg', 'https://www.contocorrenteonline.it/2023/05/24/iliad-nuova-offerta-flash-200/', 23),
(43, 'Bikejoring: cos’è, come si pratica e quali sono i benefici...', 'Hai mai sentito parlare di bikejoring? Scopriamo di cosa si tratta e come si pratica la corsa con i cani....', 'https://citynews-today.stgy.ovh/~media/original-hi/5695176956921/bikejoring.jpg', 'https://www.romatoday.it/animali/bikejoring-cose-benefici.html', 13),
(44, 'Lodigiani-Romulea 3-2: i biancorossi vincono la Coppa Italia Promozione...', 'Non riesce l\'impresa alla Romulea nella finale di Coppa Italia Promozione. La Lodigiani vince per tre a due con la rete di De Vecchis decisiva nel secondo atto della finale...', 'https://citynews-romatoday.stgy.ovh/~media/original-hi/70083633683913/maione.jpg', 'https://www.romatoday.it/sport/calcio/lodigiani-romulea-finale-coppa-italia-promozione-28-maggio.html', 34),
(45, 'Pordenone a rischio fallimento, dal Friuli: anche Cairo interessato all’acquisto...', 'Come riportato da Il Gazzettino, Cairo e Lotito avrebbero mostrato interesse per l’acquisizione […]...', 'elementi/noimage.jpg', 'https://www.toro.it/toro/primo-piano/cairo-interessato-pordenone/1305592/', 34),
(46, 'Chi è Ansah, l’attaccante che ha portato il Torino Primavera in semifinale...', 'Classe 2004, ghanese, pescato dal Cit Turin e poi approdato al Torino nel […]...', 'elementi/noimage.jpg', 'https://www.toro.it/giovanili/chi-e-herbert-ansah/1305447/', 34),
(47, 'Toro a giugno con ancora due obiettivi: chi lo avrebbe mai detto...', 'La Primavera in lotta per lo scudetto, la Prima squadra che crede ancora […]...', 'elementi/noimage.jpg', 'https://www.toro.it/rubriche/editoriale/torino-a-giugno-ancora-due-obiettivi/1305584/', 13),
(48, 'Toro a giugno con ancora due obiettivi: chi lo avrebbe mai detto...', 'La Primavera in lotta per lo scudetto, la Prima squadra che crede ancora […]...', 'elementi/noimage.jpg', 'https://www.toro.it/rubriche/editoriale/torino-a-giugno-ancora-due-obiettivi/1305584/', 31),
(49, 'Incidente al crossodromo di Crotti d’Adda: grave un motociclista di 30 anni...', 'Ha perso il controllo della moto, a quanto pare in uscita da un salto, ed è caduto rovinosamente...', 'elementi/noimage.jpg', 'https://www.ilgiorno.it/cremona/cronaca/pista-motocross-incidente-crotti-adda-sef02jby', 13);

-- --------------------------------------------------------

--
-- Struttura della tabella `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `testo` varchar(150) DEFAULT NULL,
  `immagine` varchar(150) DEFAULT NULL,
  `datapubblicazione` datetime DEFAULT NULL,
  `utente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `post`
--

INSERT INTO `post` (`id`, `testo`, `immagine`, `datapubblicazione`, `utente`) VALUES
(75, 'Che ne dite di andare a mangiare fuori?', '', '2023-05-24 11:09:56', 13),
(76, 'Questo non è fallo??!!', 'images/3337336-68226988-2560-1440.jpeg', '2023-05-24 11:21:25', 18),
(77, 'C\'è solo un goat in circolazione', 'images/apps.46116.70628353720390187.c5ec2284-1a6e-4ed0-a094-b54b14b8d466.jpeg', '2023-05-24 22:08:46', 24),
(78, '', 'images/2c4743f0c76b9ba5339b8cffe5cd0a8f.jpg', '2023-05-24 22:10:55', 23),
(82, 'Gara davvero noiosa!', 'images/152124878-fcc0a029-265c-4ce7-9cda-dc9cb82efd4c.jpg', '2023-05-28 18:07:48', 13),
(83, 'Oggi malissimo! Ci rifaremo presto, testa già in Spagna', 'images/Monte_Carlo_Formula_1_track_map.svg.png', '2023-05-28 18:10:08', 31),
(84, 'P1! Ripeto P1', 'images/verstappen-monaco.jpg', '2023-05-28 18:12:23', 32),
(85, 'E anche quest\'anno porterò a casa un altro titolo!', 'images/formula-1-2021-abu-dhabi-gara.jpg', '2023-05-28 18:13:25', 32);

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `cognome` varchar(100) DEFAULT NULL,
  `datadinascita` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `passwordd` varchar(100) DEFAULT NULL,
  `profilepic` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`id`, `nome`, `cognome`, `datadinascita`, `email`, `username`, `passwordd`, `profilepic`) VALUES
(13, 'Gabriele', 'Florio', '2001-06-03', 'gabrieleflorio01@gmail.com', 'Gabriele', '$2y$10$F90coXQr3dxhseMUXpF0O.sX/NbxWssnEW8FAhU7qi7VBEsIPwww.', 'https://i.imgur.com/yMZT8ZH.jpg'),
(14, 'Max ', 'Allegri', '1960-10-10', 'maxallagri@gmail.com', 'maxallegri', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'https://i.imgur.com/AFiILam.jpg'),
(15, 'Mirko', 'Di natale', '2001-10-10', 'mirkodinatale@gmail.com', 'mirko', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'https://i.imgur.com/yMZT8ZH.jpg'),
(16, 'Aurelio', 'De Laurentis', '1955-10-10', 'aurelio@gmail.com', 'ADL', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'https://i.imgur.com/9DjHoNK.jpg'),
(17, 'Francesco', 'Nuzzo', '2001-10-10', 'francnuzzo@gmail.com', 'nuzzo', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'https://i.imgur.com/xraxQe8.jpg'),
(18, 'Gabriele', 'Lo Conti', '2001-03-10', 'gabrieleloconti@gmail.com', 'Jimmy', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'https://i.imgur.com/0q91TZd.jpg'),
(19, 'Emanuele', 'Pio', '0000-00-00', 'emanuelepio@gmail.com', 'piotre', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'https://i.imgur.com/dKnuOCH.jpg'),
(20, 'Luca', 'Giusa', '2001-11-07', 'lucagiusa@gmail.com', 'giusa', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'https://i.imgur.com/fnQgcmY.jpg'),
(21, 'Alessia', 'Maccarone', '0000-00-00', 'alessiamaccarone@gmail.com', 'alessiamaccarone', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'https://i.imgur.com/qo3wskx.jpg'),
(22, 'Andrea', 'Lo conti', '2001-03-10', 'andrealoconti@gmail.com', 'gimmy', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'https://i.imgur.com/PUgrucN.jpg'),
(23, 'Cristiano', 'Ronaldo', '1980-10-10', 'cr7@gmail.com', 'TheRealGoat', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'profileimages/81TxaIK1wfL._AC_SL1500_.jpg'),
(24, 'Lionel', 'Messi', '1987-06-24', 'lionelmessi@gmail.com', 'LionelMessi', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'profileimages/3137560-64306928-2560-1440.jpg'),
(25, 'Barack', 'Obama', '1961-08-04', 'barak@gmail.com', 'BarakObama', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'profileimages/President_Barack_Obama.jpg'),
(26, 'Donald', 'Trupm', '1946-06-14', 'donaldtrump@gmail.com', 'DTrump', '$2y$10$C07Sgtu.QxHFA05yBIiQh.xVZpjR6p9VZWkvNcZsva.4rFi885wkC', 'profileimages/95000fd9805e154b245f0f4d0cfbe300.jpg'),
(30, 'Zinedine', 'Zidane', '1972-06-23', 'zinedine@gmail.com', 'Zizou', '$2y$10$SrOler89nbLxaetwemCEEO0RJFnUzWhUZByGj4vl9GgVmtIuXnio.', 'profileimages/Zinédine_Zidane_-_Juventus_FC_1998-99.jpg'),
(31, 'Charles', 'Leclerc', '1997-10-16', 'charles@gmail.com', 'Charles', '$2y$10$gxWgkg0oUoSNTijZ4x8jl.HXc5xsFAGzMZm360U35pZmPmVTddSHG', 'profileimages/charles-leclerc-2-min (1).jpg'),
(32, 'Max ', 'Verstappen', '1997-09-30', 'supermax@gmail.com', 'MaxVerstappen', '$2y$10$wHbJPiNGaRVmhpJhWp66CuxAGpMMzrQpWqF5qAtOmuTrBHiSsHm9i', 'profileimages/max-verstappen-profile-pic.png'),
(33, 'Lewis', 'Hamilton', '1985-01-07', 'lewisHamilton@gmail.com', 'lewishamilton', '$2y$10$nZuR2IJsGBo/YjV7.lkSxuG3eyAvHSWJ6UgZ73PoTT92yMsYNoyza', 'profileimages/sn1uh3er8s891.jpg'),
(34, 'Pippo', 'Lanzafame', '2010-10-10', 'pippolanzafame@gmail.com', 'pippolanzafame', '$2y$10$lwuLdAMa/fNrMMPOsGPzfetA/pjjUzDGKWjHQ./Z5cCMUUYjX7/3S', 'https://i.imgur.com/xraxQe8.jpg');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `commento`
--
ALTER TABLE `commento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idutente` (`idutente`),
  ADD KEY `idpost` (`idpost`);

--
-- Indici per le tabelle `follow`
--
ALTER TABLE `follow`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utente1` (`utente1`),
  ADD KEY `utente2` (`utente2`);

--
-- Indici per le tabelle `likee`
--
ALTER TABLE `likee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utente` (`utente`),
  ADD KEY `idpost` (`idpost`);

--
-- Indici per le tabelle `newssalvate`
--
ALTER TABLE `newssalvate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idutente` (`idutente`);

--
-- Indici per le tabelle `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utente` (`utente`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `commento`
--
ALTER TABLE `commento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT per la tabella `follow`
--
ALTER TABLE `follow`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=414;

--
-- AUTO_INCREMENT per la tabella `likee`
--
ALTER TABLE `likee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT per la tabella `newssalvate`
--
ALTER TABLE `newssalvate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT per la tabella `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `commento`
--
ALTER TABLE `commento`
  ADD CONSTRAINT `commento_ibfk_1` FOREIGN KEY (`idutente`) REFERENCES `utente` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `commento_ibfk_2` FOREIGN KEY (`idpost`) REFERENCES `post` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `follow`
--
ALTER TABLE `follow`
  ADD CONSTRAINT `follow_ibfk_1` FOREIGN KEY (`utente1`) REFERENCES `utente` (`id`),
  ADD CONSTRAINT `follow_ibfk_2` FOREIGN KEY (`utente2`) REFERENCES `utente` (`id`);

--
-- Limiti per la tabella `likee`
--
ALTER TABLE `likee`
  ADD CONSTRAINT `likee_ibfk_1` FOREIGN KEY (`utente`) REFERENCES `utente` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likee_ibfk_2` FOREIGN KEY (`idpost`) REFERENCES `post` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `newssalvate`
--
ALTER TABLE `newssalvate`
  ADD CONSTRAINT `newssalvate_ibfk_1` FOREIGN KEY (`idutente`) REFERENCES `utente` (`id`);

--
-- Limiti per la tabella `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`utente`) REFERENCES `utente` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
