interface District {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  isPopular?: boolean;
  districts: District[];
}

export const cities: City[] = [
  {
    id: 34,
    name: "İstanbul",
    isPopular: true,
    districts: [
      { id: 34001, name: "Adalar" },
      { id: 34002, name: "Arnavutköy" },
      { id: 34003, name: "Ataşehir" },
      { id: 34004, name: "Avcılar" },
      { id: 34005, name: "Bağcılar" },
      { id: 34006, name: "Bahçelievler" },
      { id: 34007, name: "Bakırköy" },
      { id: 34008, name: "Başakşehir" },
      { id: 34009, name: "Bayrampaşa" },
      { id: 34010, name: "Beşiktaş" },
      { id: 34011, name: "Beykoz" },
      { id: 34012, name: "Beylikdüzü" },
      { id: 34013, name: "Beyoğlu" },
      { id: 34014, name: "Büyükçekmece" },
      { id: 34015, name: "Çatalca" },
      { id: 34016, name: "Çekmeköy" },
      { id: 34017, name: "Esenler" },
      { id: 34018, name: "Esenyurt" },
      { id: 34019, name: "Eyüpsultan" },
      { id: 34020, name: "Fatih" },
      { id: 34021, name: "Gaziosmanpaşa" },
      { id: 34022, name: "Güngören" },
      { id: 34023, name: "Kadıköy" },
      { id: 34024, name: "Kağıthane" },
      { id: 34025, name: "Kartal" },
      { id: 34026, name: "Küçükçekmece" },
      { id: 34027, name: "Maltepe" },
      { id: 34028, name: "Pendik" },
      { id: 34029, name: "Sancaktepe" },
      { id: 34030, name: "Sarıyer" },
      { id: 34031, name: "Silivri" },
      { id: 34032, name: "Sultanbeyli" },
      { id: 34033, name: "Sultangazi" },
      { id: 34034, name: "Şile" },
      { id: 34035, name: "Şişli" },
      { id: 34036, name: "Tuzla" },
      { id: 34037, name: "Ümraniye" },
      { id: 34038, name: "Üsküdar" },
      { id: 34039, name: "Zeytinburnu" }
    ]
  },
  {
    id: 41,
    name: "Kocaeli",
    isPopular: true,
    districts: [
      { id: 41001, name: "Başiskele" },
      { id: 41002, name: "Çayırova" },
      { id: 41003, name: "Darıca" },
      { id: 41004, name: "Derince" },
      { id: 41005, name: "Dilovası" },
      { id: 41006, name: "Gebze" },
      { id: 41007, name: "Gölcük" },
      { id: 41008, name: "İzmit" },
      { id: 41009, name: "Kandıra" },
      { id: 41010, name: "Karamürsel" },
      { id: 41011, name: "Kartepe" },
      { id: 41012, name: "Körfez" }
    ]
  },
  {
    id: 16,
    name: "Bursa",
    isPopular: true,
    districts: [
      { id: 16001, name: "Büyükorhan" },
      { id: 16002, name: "Gemlik" },
      { id: 16003, name: "Gürsu" },
      { id: 16004, name: "Harmancık" },
      { id: 16005, name: "İnegöl" },
      { id: 16006, name: "İznik" },
      { id: 16007, name: "Karacabey" },
      { id: 16008, name: "Keles" },
      { id: 16009, name: "Kestel" },
      { id: 16010, name: "Mudanya" },
      { id: 16011, name: "Mustafakemalpaşa" },
      { id: 16012, name: "Nilüfer" },
      { id: 16013, name: "Orhaneli" },
      { id: 16014, name: "Orhangazi" },
      { id: 16015, name: "Osmangazi" },
      { id: 16016, name: "Yenişehir" },
      { id: 16017, name: "Yıldırım" }
    ]
  }
]; 