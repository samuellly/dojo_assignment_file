using System;
using System.Collections.Generic;

namespace ConsoleApplication
{
    public class Card
    {
        public string val,
            suit;
        public int numerical_value;
        public Card(string valI, string suitI, int num)
        {
            val = valI;
            suit = suitI;
            numerical_value = num;
        }
    }
    public class Deck
    {
        public List<Card> cards;

        public void Reset()
        {
            cards = new List<Card>();
            string[] cardVal = new string[13] {"A","2","3","4","5","6","7","8","9","10","J","Q","K"};
            string[] cardSuit = new string[4] {"Clubs","Spades","Hearts","Diamonds"};
            for (int i = 0; i < 13; i++)
            {
                for (int j = 0; j < cardSuit.Length; j++)
                {
                string face = cardVal[i];
                string suit = cardSuit[j];
                Card ncard = new Card(face, suit, (i+1));
                cards.Add(ncard);
                }
            }
        }

        public Deck()
        {
            Reset();
            // foreach (Card card in cards)
            // {
            //     Console.WriteLine(card.val + ", " + card.suit + ", " + card.numerical_value);
            // }
        }

        public Card Deal()
        {
            Card topcard = cards[cards.Count-1];
            cards.RemoveAt(cards.Count-1);
            return topcard;
        }

        public void Shuffle()
        {
    //         for i from n−1 downto 1 do
    //  j ← random integer such that 0 ≤ j ≤ i
    //  exchange a[j] and a[i]
            Random rnd = new Random();
            for (int i = cards.Count-1; i >= 0; i--)
            {
                int j = rnd.Next(0, i+1);
                Card temp = cards[j];
                cards[j] = cards[i];
                cards[i] = temp;
            }
        }
    }

    public class Player
    {
        public string name;
        public List<Card> hand;

        public Player(string nameI)
        {
            name = nameI;
            hand = new List<Card>();
        }

        public Card Draw(ref Deck deck)
        {
            Card card = deck.Deal();
            hand.Add(card);
            return card;
        }

        public bool Discard(ref Card card)
        {
            bool discarded = false;
            for (int i = 0; i < hand.Count; i++)
            {
                if (hand[i] == card)
                {
                    hand.Remove(card);
                    discarded = true;
                    break;
                }
            }
            return discarded;
        }
    }
    public class Program
    {
        public static void Main(string[] args)
        {
            Deck deck1 = new Deck();
            Player player1 = new Player("Bill");
            deck1.Shuffle();
            Card dealtCard = player1.Draw(ref deck1);
            Console.WriteLine(dealtCard.val + ", " + dealtCard.suit + ", " + dealtCard.numerical_value);
            // foreach (Card card in deck1.cards)
            // {
            //     Console.WriteLine(card.val + ", " + card.suit + ", " + card.numerical_value);
            // }
            Console.WriteLine(deck1.cards.Count);
            bool discarded = player1.Discard(ref dealtCard);
            Console.WriteLine(discarded);
            Console.WriteLine(player1.Discard(ref dealtCard));
        }
    }
}


