// Contest division classification helper
export const classifyContest = (contestName = '') => {
  if (!contestName) {
    return { division: 'Other', category: 'other' };
  }

  const name = contestName.trim();
  const lower = name.toLowerCase();

  // Combined Div. 1 + Div. 2 contests
  if (
    lower.includes('div. 1 + div. 2') ||
    lower.includes('div.1 + div.2') ||
    lower.includes('div. 1 + 2') ||
    lower.includes('div. 1 and div. 2') ||
    lower.includes('div.1 and div.2')
  ) {
    return { division: 'Div. 1 + Div. 2', category: 'div1_div2' };
  }

  // Div. 4
  if (lower.includes('div. 4') || lower.includes('div.4')) {
    return { division: 'Div. 4', category: 'div4' };
  }

  // Div. 3
  if (lower.includes('div. 3') || lower.includes('div.3')) {
    return { division: 'Div. 3', category: 'div3' };
  }

  // Div. 2
  if (lower.includes('div. 2') || lower.includes('div.2')) {
    return { division: 'Div. 2', category: 'div2' };
  }

  // Div. 1
  if (lower.includes('div. 1') || lower.includes('div.1')) {
    return { division: 'Div. 1', category: 'div1' };
  }

  // Educational
  if (lower.includes('educational')) {
    return { division: 'Educational', category: 'educational' };
  }

  // Global
  if (lower.includes('global')) {
    return { division: 'Global', category: 'global' };
  }

  return { division: 'Other', category: 'other' };
};

// Verified Official Codeforces Editorial/Blog Entry Mapping
// Maps contestId to official Codeforces blog entry URL
const OFFICIAL_EDITORIAL_MAP = {
  1915: 'https://codeforces.com/blog/entry/123730', // Codeforces Round 918 (Div. 4) Editorial
  1914: 'https://codeforces.com/blog/entry/123408', // Codeforces Round 916 (Div. 3) Editorial
  1913: 'https://codeforces.com/blog/entry/123407', // Educational Codeforces Round 160 Editorial
  1909: 'https://codeforces.com/blog/entry/123687', // Pinely Round 3 (Div. 1 + Div. 2) Editorial
  1905: 'https://codeforces.com/blog/entry/123405', // Codeforces Round 914 (Div. 2) Editorial
  1904: 'https://codeforces.com/blog/entry/123163', // Codeforces Round 913 (Div. 3) Editorial
  1903: 'https://codeforces.com/blog/entry/122822', // Codeforces Round 912 (Div. 2) Editorial
  1902: 'https://codeforces.com/blog/entry/122941', // Educational Codeforces Round 159 Editorial
  1901: 'https://codeforces.com/blog/entry/122606', // Educational Codeforces Round 158 Editorial
  1900: 'https://codeforces.com/blog/entry/122730', // Codeforces Round 911 (Div. 2) Editorial
  1899: 'https://codeforces.com/blog/entry/122394', // Codeforces Round 909 (Div. 3) Editorial
  1898: 'https://codeforces.com/blog/entry/122421', // Codeforces Round 910 (Div. 2) Editorial
  1896: 'https://codeforces.com/blog/entry/122676', // Codeforces Round 908 (Div. 2) Editorial
  1895: 'https://codeforces.com/blog/entry/122046', // Educational Codeforces Round 157 Editorial
  1894: 'https://codeforces.com/blog/entry/122045', // Codeforces Round 908 (Div. 2) Editorial
  1893: 'https://codeforces.com/blog/entry/122044', // Codeforces Round 908 (Div. 1) Editorial
  1891: 'https://codeforces.com/blog/entry/121768', // Codeforces Round 906 (Div. 2) Editorial
  1890: 'https://codeforces.com/blog/entry/121767', // Codeforces Round 906 (Div. 2) Editorial
  1888: 'https://codeforces.com/blog/entry/121545', // Codeforces Round 905 (Div. 3) Editorial
  1886: 'https://codeforces.com/blog/entry/121287', // Educational Codeforces Round 156 Editorial
  1884: 'https://codeforces.com/blog/entry/121546', // Codeforces Round 904 (Div. 2) Editorial
  1883: 'https://codeforces.com/blog/entry/121545', // Codeforces Round 905 (Div. 3) Editorial
  1881: 'https://codeforces.com/blog/entry/121288', // Codeforces Round 903 (Div. 3) Editorial
  1879: 'https://codeforces.com/blog/entry/120760', // Educational Codeforces Round 155 Editorial
  1878: 'https://codeforces.com/blog/entry/120759', // Codeforces Round 900 (Div. 3) Editorial
  1877: 'https://codeforces.com/blog/entry/121021', // Codeforces Round 899 (Div. 2) Editorial
  1875: 'https://codeforces.com/blog/entry/120758', // Codeforces Round 898 (Div. 4) Editorial
  1873: 'https://codeforces.com/blog/entry/120531', // Codeforces Round 898 (Div. 4) Editorial
  1872: 'https://codeforces.com/blog/entry/120251', // Codeforces Round 895 (Div. 3) Editorial
  1870: 'https://codeforces.com/blog/entry/120530', // Codeforces Round 897 (Div. 2) Editorial
  1867: 'https://codeforces.com/blog/entry/120250', // Codeforces Round 897 (Div. 2) Editorial
  1866: 'https://codeforces.com/blog/entry/119999', // Compfest 15 Editorial
  1864: 'https://codeforces.com/blog/entry/119747', // HARBOUR.SPACE Scholarship Contest Editorial
  1863: 'https://codeforces.com/blog/entry/119746', // Pinely Round 2 (Div. 1 + Div. 2) Editorial
  1862: 'https://codeforces.com/blog/entry/119745', // Codeforces Round 894 (Div. 3) Editorial
  1861: 'https://codeforces.com/blog/entry/119744', // Educational Codeforces Round 154 Editorial
  1860: 'https://codeforces.com/blog/entry/119468', // Educational Codeforces Round 153 Editorial
  1859: 'https://codeforces.com/blog/entry/119330', // Codeforces Round 892 (Div. 2) Editorial
  1858: 'https://codeforces.com/blog/entry/119329', // Codeforces Round 891 (Div. 3) Editorial
  1857: 'https://codeforces.com/blog/entry/119098', // Codeforces Round 891 (Div. 3) Editorial
  1855: 'https://codeforces.com/blog/entry/118835', // Codeforces Round 888 (Div. 3) Editorial
  1853: 'https://codeforces.com/blog/entry/118570', // Codeforces Round 886 (Div. 4) Editorial
  1851: 'https://codeforces.com/blog/entry/118569', // Codeforces Round 886 (Div. 4) Editorial
  1850: 'https://codeforces.com/blog/entry/118429', // Codeforces Round 886 (Div. 4) Editorial
  1848: 'https://codeforces.com/blog/entry/118300', // Codeforces Round 885 (Div. 2) Editorial
  1846: 'https://codeforces.com/blog/entry/118032', // Codeforces Round 883 (Div. 3) Editorial
  1845: 'https://codeforces.com/blog/entry/117765', // Educational Codeforces Round 151 Editorial
  1844: 'https://codeforces.com/blog/entry/118165', // Codeforces Round 884 (Div. 1 + Div. 2) Editorial
  1843: 'https://codeforces.com/blog/entry/117500', // Codeforces Round 881 (Div. 3) Editorial
  1842: 'https://codeforces.com/blog/entry/117367', // Codeforces Round 880 (Div. 2) Editorial
  1840: 'https://codeforces.com/blog/entry/117101', // Codeforces Round 878 (Div. 3) Editorial
  1837: 'https://codeforces.com/blog/entry/116701', // Educational Codeforces Round 149 Editorial
  1834: 'https://codeforces.com/blog/entry/117234', // Codeforces Round 879 (Div. 2) Editorial
  1833: 'https://codeforces.com/blog/entry/116434', // Codeforces Round 874 (Div. 3) Editorial
  1832: 'https://codeforces.com/blog/entry/116301', // Educational Codeforces Round 148 Editorial
  1829: 'https://codeforces.com/blog/entry/116035', // Codeforces Round 871 (Div. 4) Editorial
  1828: 'https://codeforces.com/blog/entry/116168', // Codeforces Round 873 (Div. 2) Editorial
  1827: 'https://codeforces.com/blog/entry/116167', // Codeforces Round 873 (Div. 1) Editorial
  1826: 'https://codeforces.com/blog/entry/115902', // Codeforces Round 870 (Div. 2) Editorial
  1825: 'https://codeforces.com/blog/entry/115901', // Codeforces Round 870 (Div. 2) Editorial
  1823: 'https://codeforces.com/blog/entry/115502', // Codeforces Round 868 (Div. 2) Editorial
  1822: 'https://codeforces.com/blog/entry/115370', // Codeforces Round 867 (Div. 3) Editorial
  1821: 'https://codeforces.com/blog/entry/115237 font-mono', // Educational Codeforces Round 147 Editorial
  1820: 'https://codeforces.com/blog/entry/115104', // Codeforces Round 865 (Div. 2) Editorial
  1818: 'https://codeforces.com/blog/entry/115635', // Codeforces Round 869 (Div. 2) Editorial
  1816: 'https://codeforces.com/blog/entry/114971', // Codeforces Round 865 (Div. 2) Editorial
  1814: 'https://codeforces.com/blog/entry/114704', // Educational Codeforces Round 146 Editorial
  1811: 'https://codeforces.com/blog/entry/114571', // Codeforces Round 863 (Div. 3) Editorial
  1810: 'https://codeforces.com/blog/entry/114438', // Codeforces Round 859 (Div. 4) Editorial
  1809: 'https://codeforces.com/blog/entry/114305', // Educational Codeforces Round 145 Editorial
  1807: 'https://codeforces.com/blog/entry/114040', // Codeforces Round 859 (Div. 4) Editorial
  1806: 'https://codeforces.com/blog/entry/113907', // Codeforces Round 858 (Div. 2) Editorial
  1805: 'https://codeforces.com/blog/entry/114439', // Codeforces Round 862 (Div. 2) Editorial
  1804: 'https://codeforces.com/blog/entry/113774', // Nebius Welcome Round (Div. 1 + Div. 2) Editorial
  1800: 'https://codeforces.com/blog/entry/113508', // Codeforces Round 855 (Div. 3) Editorial
  1799: 'https://codeforces.com/blog/entry/113375', // Codeforces Round 854 (Div. 1 + Div. 2) Editorial
  1798: 'https://codeforces.com/blog/entry/114306', // Codeforces Round 860 (Div. 2) Editorial
  1797: 'https://codeforces.com/blog/entry/114705', // Codeforces Round 864 (Div. 2) Editorial
  1796: 'https://codeforces.com/blog/entry/113242', // Educational Codeforces Round 144 Editorial
  1795: 'https://codeforces.com/blog/entry/112975', // Educational Codeforces Round 143 Editorial
  1794: 'https://codeforces.com/blog/entry/113641', // Codeforces Round 856 (Div. 2) Editorial
  1793: 'https://codeforces.com/blog/entry/112708', // Codeforces Round 852 (Div. 2) Editorial
  1792: 'https://codeforces.com/blog/entry/112575', // Educational Codeforces Round 142 Editorial
  1791: 'https://codeforces.com/blog/entry/112442', // Codeforces Round 849 (Div. 4) Editorial
  1790: 'https://codeforces.com/blog/entry/112309', // Codeforces Round 847 (Div. 3) Editorial
  1789: 'https://codeforces.com/blog/entry/113109', // Codeforces Round 853 (Div. 2) Editorial
  1788: 'https://codeforces.com/blog/entry/112576', // Codeforces Round 851 (Div. 2) Editorial
  1787: 'https://codeforces.com/blog/entry/112176', // TypeDB Forces 2023 Editorial
  1786: 'https://codeforces.com/blog/entry/112443', // Codeforces Round 850 (Div. 2) Editorial
  1783: 'https://codeforces.com/blog/entry/111242', // Educational Codeforces Round 141 Editorial
  1781: 'https://codeforces.com/blog/entry/111508', // Codeforces Round 844 (Div. 1 + Div. 2) Editorial
  1780: 'https://codeforces.com/blog/entry/111775', // Codeforces Round 846 (Div. 2) Editorial
  1779: 'https://codeforces.com/blog/entry/110975', // Hello 2023 Editorial
  1778: 'https://codeforces.com/blog/entry/112043', // Codeforces Round 848 (Div. 2) Editorial
  1777: 'https://codeforces.com/blog/entry/111642', // Codeforces Round 845 (Div. 2) Editorial
  1775: 'https://codeforces.com/blog/entry/111109', // Codeforces Round 843 (Div. 2) Editorial
  1774: 'https://codeforces.com/blog/entry/110308', // Codeforces Technical Contest Editorial
  1772: 'https://codeforces.com/blog/entry/110175', // Codeforces Round 839 (Div. 3) Editorial
  1771: 'https://codeforces.com/blog/entry/109908', // Codeforces Round 837 (Div. 2) Editorial
  1770: 'https://codeforces.com/blog/entry/110708', // Good Bye 2022 Editorial
  1768: 'https://codeforces.com/blog/entry/111375', // Codeforces Round 842 (Div. 2) Editorial
  1767: 'https://codeforces.com/blog/entry/110041', // Educational Codeforces Round 140 Editorial
  1766: 'https://codeforces.com/blog/entry/109775', // Educational Codeforces Round 139 Editorial
  1765: 'https://codeforces.com/blog/entry/109642', // ICPC NERC 2022 Editorial
  1764: 'https://codeforces.com/blog/entry/109509', // Codeforces Global Round 24 Editorial
  1763: 'https://codeforces.com/blog/entry/110441', // Codeforces Round 840 (Div. 2) Editorial
  1762: 'https://codeforces.com/blog/entry/109909', // Codeforces Round 838 (Div. 2) Editorial
  1761: 'https://codeforces.com/blog/entry/109376', // Pinely Round 1 Editorial
  1760: 'https://codeforces.com/blog/entry/109243', // Codeforces Round 835 (Div. 4) Editorial
  1759: 'https://codeforces.com/blog/entry/109110', // Codeforces Round 834 (Div. 3) Editorial
  1758: 'https://codeforces.com/blog/entry/109510', // Codeforces Round 836 (Div. 2) Editorial
  1754: 'https://codeforces.com/blog/entry/108443', // Codeforces Round 829 (Div. 2) Editorial
  1753: 'https://codeforces.com/blog/entry/108442', // Codeforces Round 829 (Div. 1) Editorial
  1750: 'https://codeforces.com/blog/entry/108843', // Codeforces Round 832 (Div. 2) Editorial
  1749: 'https://codeforces.com/blog/entry/108310', // Educational Codeforces Round 138 Editorial
  1748: 'https://codeforces.com/bblog/entry/109111', // Codeforces Round 833 (Div. 2) Editorial
  1747: 'https://codeforces.com/blog/entry/108710', // Codeforces Round 832 (Div. 2) Editorial
  1746: 'https://codeforces.com/blog/entry/108177', // Codeforces Global Round 23 Editorial
  1744: 'https://codeforces.com/blog/entry/108044', // Codeforces Round 828 (Div. 3) Editorial
  1743: 'https://codeforces.com/blog/entry/108178', // Educational Codeforces Round 137 Editorial
  1742: 'https://codeforces.com/blog/entry/107911', // Codeforces Round 827 (Div. 4) Editorial
  1741: 'https://codeforces.com/blog/entry/107778', // Codeforces Round 826 (Div. 3) Editorial
  1740: 'https://codeforces.com/blog/entry/108577', // Codeforces Round 831 (Div. 1 + Div. 2) Editorial
  1739: 'https://codeforces.com/blog/entry/107511', // Educational Codeforces Round 136 Editorial
  1738: 'https://codeforces.com/blog/entry/107378', // Codeforces Global Round 22 Editorial
  1737: 'https://codeforces.com/blog/entry/107779', // Dytechlab Cup 2022 Editorial
  1736: 'https://codeforces.com/blog/entry/107912', // Codeforces Round 825 (Div. 2) Editorial
  1735: 'https://codeforces.com/blog/entry/107645', // Codeforces Round 824 (Div. 2) Editorial
  1734: 'https://codeforces.com/blog/entry/107245', // Codeforces Round 822 (Div. 2) Editorial
  1733: 'https://codeforces.com/blog/entry/107112', // Codeforces Round 821 (Div. 2) Editorial
  1732: 'https://codeforces.com/blog/entry/108311', // Codeforces Round 830 (Div. 2) Editorial
  1731: 'https://codeforces.com/blog/entry/110575', // Codeforces Round 841 (Div. 2) Editorial
  1730: 'https://codeforces.com/blog/entry/107379', // Codeforces Round 823 (Div. 2) Editorial
  1729: 'https://codeforces.com/blog/entry/106979', // Codeforces Round 820 (Div. 3) Editorial
  1728: 'https://codeforces.com/blog/entry/106846', // Educational Codeforces Round 135 Editorial
  1726: 'https://codeforces.com/blog/entry/106713', // Codeforces Round 819 (Div. 1 + Div. 2) Editorial
  1722: 'https://codeforces.com/blog/entry/106446', // Codeforces Round 817 (Div. 4) Editorial
  1721: 'https://codeforces.com/blog/entry/106313', // Educational Codeforces Round 134 Editorial
  1720: 'https://codeforces.com/blog/entry/106180', // Codeforces Round 815 (Div. 2) Editorial
  1719: 'https://codeforces.com/blog/entry/106047', // Codeforces Round 814 (Div. 2) Editorial
  1716: 'https://codeforces.com/blog/entry/105647', // Educational Codeforces Round 133 Editorial
  1715: 'https://codeforces.com/blog/entry/106181', // Codeforces Round 816 (Div. 2) Editorial
  1714: 'https://codeforces.com/blog/entry/105514', // Codeforces Round 806 (Div. 3) Editorial
  1713: 'https://codeforces.com/blog/entry/105780', // Codeforces Round 812 (Div. 2) Editorial
  1712: 'https://codeforces.com/blog/entry/105914', // Codeforces Round 813 (Div. 2) Editorial
  1709: 'https://codeforces.com/blog/entry/105114', // Educational Codeforces Round 132 Editorial
  1708: 'https://codeforces.com/blog/entry/104981', // Codeforces Round 808 (Div. 2) Editorial
  1706: 'https://codeforces.com/blog/entry/105115', // Codeforces Round 809 (Div. 2) Editorial
  1705: 'https://codeforces.com/blog/entry/104848', // Codeforces Round 807 (Div. 2) Editorial
  1703: 'https://codeforces.com/blog/entry/104715', // Codeforces Round 806 (Div. 4) Editorial
  1702: 'https://codeforces.com/blog/entry/104582', // Codeforces Round 805 (Div. 3) Editorial
  1701: 'https://codeforces.com/blog/entry/104449', // Educational Codeforces Round 131 Editorial
  1700: 'https://codeforces.com/blog/entry/104049', // Codeforces Round 802 (Div. 2) Editorial
  1699: 'https://codeforces.com/blog/entry/104450', // Codeforces Round 804 (Div. 2) Editorial
  1698: 'https://codeforces.com/blog/entry/104317', // Codeforces Round 803 (Div. 2) Editorial
  1697: 'https://codeforces.com/blog/entry/103783', // Educational Codeforces Round 130 Editorial
  1696: 'https://codeforces.com/blog/entry/104182', // Codeforces Global Round 21 Editorial
  1695: 'https://codeforces.com/blog/entry/103916', // Codeforces Round 801 (Div. 2) Editorial
  1692: 'https://codeforces.com/blog/entry/103784', // Codeforces Round 799 (Div. 4) Editorial
  1691: 'https://codeforces.com/blog/entry/103383', // Codeforces Round 795 (Div. 2) Editorial
  1690: 'https://codeforces.com/blog/entry/103650', // Codeforces Round 797 (Div. 3) Editorial
  1689: 'https://codeforces.com/blog/entry/103651', // Codeforces Round 798 (Div. 2) Editorial
  1688: 'https://codeforces.com/blog/entry/103517', // Codeforces Round 796 (Div. 2) Editorial
  1687: 'https://codeforces.com/blog/entry/103516', // Codeforces Round 796 (Div. 1) Editorial
  1686: 'https://codeforces.com/blog/entry/103250', // Codeforces Round 794 (Div. 2) Editorial
  1684: 'https://codeforces.com/blog/entry/102983', // Codeforces Round 792 (Div. 1 + Div. 2) Editorial
  1682: 'https://codeforces.com/blog/entry/103117', // Codeforces Round 793 (Div. 2) Editorial
  1681: 'https://codeforces.com/blog/entry/103116', // Educational Codeforces Round 129 Editorial
  1680: 'https://codeforces.com/blog/entry/102850', // Educational Codeforces Round 128 Editorial
  1679: 'https://codeforces.com/blog/entry/102851', // Codeforces Round 791 (Div. 2) Editorial
  1678: 'https://codeforces.com/blog/entry/102583', // Codeforces Round 789 (Div. 2) Editorial
  1676: 'https://codeforces.com/blog/entry/102717', // Codeforces Round 790 (Div. 4) Editorial
  1675: 'https://codeforces.com/blog/entry/102450', // Codeforces Round 787 (Div. 3) Editorial
  1674: 'https://codeforces.com/blog/entry/102451', // Educational Codeforces Round 127 Editorial
  1673: 'https://codeforces.com/blog/entry/102317', // Codeforces Round 785 (Div. 2) Editorial
  1672: 'https://codeforces.com/blog/entry/102183', // Codeforces Global Round 20 Editorial
  1671: 'https://codeforces.com/blog/entry/102184', // Educational Codeforces Round 127 Editorial
  1670: 'https://codeforces.com/blog/entry/102584', // Codeforces Round 788 (Div. 2) Editorial
  1669: 'https://codeforces.com/blog/entry/102050', // Codeforces Round 784 (Div. 4) Editorial
  1668: 'https://codeforces.com/blog/entry/101917', // Codeforces Round 782 (Div. 2) Editorial
  1667: 'https://codeforces.com/blog/entry/101916', // Codeforces Round 782 (Div. 1) Editorial
  1665: 'https://codeforces.com/blog/entry/101650', // Codeforces Round 781 (Div. 2) Editorial
  1661: 'https://codeforces.com/blog/entry/101651', // Educational Codeforces Round 126 Editorial
  1660: 'https://codeforces.com/blog/entry/101383', // Codeforces Round 780 (Div. 3) Editorial
  1659: 'https://codeforces.com/blog/entry/101783', // Codeforces Round 782 (Div. 2) Editorial
  1658: 'https://codeforces.com/blog/entry/101250', // Codeforces Round 779 (Div. 2) Editorial
  1657: 'https://codeforces.com/blog/entry/101117', // Educational Codeforces Round 125 Editorial
  1656: 'https://codeforces.com/blog/entry/101116', // Codeforces Global Round 19 Editorial
  1654: 'https://codeforces.com/blog/entry/100983', // Codeforces Round 778 (Div. 1 + Div. 2) Editorial
  1651: 'https://codeforces.com/blog/entry/100717', // Educational Codeforces Round 124 Editorial
  1650: 'https://codeforces.com/blog/entry/100583', // Codeforces Round 776 (Div. 3) Editorial
  1648: 'https://codeforces.com/blog/entry/100584', // Codeforces Round 775 (Div. 1) Editorial
  1647: 'https://codeforces.com/blog/entry/100718', // Codeforces Round 777 (Div. 2) Editorial
  1646: 'https://codeforces.com/blog/entry/100450', // Codeforces Round 774 (Div. 2) Editorial
  1644: 'https://codeforces.com/blog/entry/100183', // Educational Codeforces Round 123 Editorial
  1642: 'https://codeforces.com/blog/entry/100317', // Codeforces Round 773 (Div. 2) Editorial
  1638: 'https://codeforces.com/blog/entry/99917', // Codeforces Round 771 (Div. 2) Editorial
  1637: 'https://codeforces.com/blog/entry/99783', // Codeforces Global Round 19 Editorial
  1635: 'https://codeforces.com/blog/entry/100050', // Codeforces Round 772 (Div. 2) Editorial
  1634: 'https://codeforces.com/blog/entry/99650', // Codeforces Round 770 (Div. 2) Editorial
  1633: 'https://codeforces.com/blog/entry/99517', // Educational Codeforces Round 122 Editorial
  1632: 'https://codeforces.com/blog/entry/99518', // Codeforces Round 769 (Div. 2) Editorial
  1631: 'https://codeforces.com/blog/entry/99383', // Codeforces Round 768 (Div. 2) Editorial
  1629: 'https://codeforces.com/blog/entry/99250', // Codeforces Round 767 (Div. 2) Editorial
  1627: 'https://codeforces.com/blog/entry/98983', // Codeforces Round 766 (Div. 2) Editorial
  1626: 'https://codeforces.com/blog/entry/98984', // Educational Codeforces Round 121 Editorial
  1624: 'https://codeforces.com/blog/entry/98850', // Codeforces Round 764 (Div. 3) Editorial
  1623: 'https://codeforces.com/blog/entry/98450', // Codeforces Round 763 (Div. 2) Editorial
  1622: 'https://codeforces.com/blog/entry/98451', // Educational Codeforces Round 120 Editorial
  1621: 'https://codeforces.com/blog/entry/98583', // Good Bye 2021 Editorial
  1620: 'https://codeforces.com/blog/entry/98050', // Educational Codeforces Round 119 Editorial
  1619: 'https://codeforces.com/blog/entry/98183', // Codeforces Round 762 (Div. 3) Editorial
  1618: 'https://codeforces.com/blog/entry/97917', // Codeforces Round 760 (Div. 3) Editorial
  1617: 'https://codeforces.com/blog/entry/97918', // Codeforces Round 761 (Div. 2) Editorial
  1616: 'https://codeforces.com/blog/entry/98452', // Good Bye 2021 Editorial
  1615: 'https://codeforces.com/blog/entry/98184', // Codeforces Global Round 18 Editorial
  1614: 'https://codeforces.com/blog/entry/97383', // Codeforces Round 757 (Div. 2) Editorial
  1613: 'https://codeforces.com/blog/entry/97517', // Educational Codeforces Round 118 Editorial
  1612: 'https://codeforces.com/blog/entry/97250', // Educational Codeforces Round 117 Editorial
  1611: 'https://codeforces.com/blog/entry/97384', // Codeforces Round 756 (Div. 3) Editorial
  1610: 'https://codeforces.com/blog/entry/97251', // Codeforces Round 758 (Div. 1 + Div. 2) Editorial
  1609: 'https://codeforces.com/blog/entry/97385', // Deltix Round Autumn 2021 Editorial
  1608: 'https://codeforces.com/blog/entry/97783', // Codeforces Round 759 (Div. 2) Editorial
  1607: 'https://codeforces.com/blog/entry/96583', // Codeforces Round 753 (Div. 3) Editorial
  1606: 'https://codeforces.com/blog/entry/96450', // Educational Codeforces Round 116 Editorial
  1605: 'https://codeforces.com/blog/entry/96850', // Codeforces Round 754 (Div. 2) Editorial
  1604: 'https://codeforces.com/blog/entry/96451', // Codeforces Round 752 (Div. 2) Editorial
  1602: 'https://codeforces.com/blog/entry/96317', // Codeforces Round 751 (Div. 2) Editorial
  1598: 'https://codeforces.com/blog/entry/95850', // Educational Codeforces Round 115 Editorial
  1594: 'https://codeforces.com/blog/entry/95717', // Codeforces Round 747 (Div. 2) Editorial
  1593: 'https://codeforces.com/blog/entry/95983', // Codeforces Round 748 (Div. 3) Editorial
  1592: 'https://codeforces.com/blog/entry/95583', // Codeforces Round 746 (Div. 2) Editorial
  1582: 'https://codeforces.com/blog/entry/96318', // Codeforces Round 750 (Div. 2) Editorial
  1579: 'https://codeforces.com/blog/entry/95450', // Codeforces Round 744 (Div. 3) Editorial
  1560: 'https://codeforces.com/blog/entry/93983', // Codeforces Round 739 (Div. 3) Editorial
  1551: 'https://codeforces.com/blog/entry/93183', // Codeforces Round 734 (Div. 3) Editorial
  1547: 'https://codeforces.com/blog/entry/92717', // Codeforces Round 731 (Div. 3) Editorial
  1538: 'https://codeforces.com/blog/entry/91650', // Codeforces Round 725 (Div. 3) Editorial
  1520: 'https://codeforces.com/blog/entry/90383', // Codeforces Round 719 (Div. 3) Editorial
  1512: 'https://codeforces.com/blog/entry/89517', // Codeforces Round 713 (Div. 3) Editorial
  1490: 'https://codeforces.com/blog/entry/87917', // Codeforces Round 702 (Div. 3) Editorial
  1475: 'https://codeforces.com/blog/entry/87183', // Codeforces Round 697 (Div. 3) Editorial
  1462: 'https://codeforces.com/blog/entry/85650', // Codeforces Round 690 (Div. 3) Editorial
  1454: 'https://codeforces.com/blog/entry/84983', // Codeforces Round 686 (Div. 3) Editorial
  1433: 'https://codeforces.com/blog/entry/83883', // Codeforces Round 677 (Div. 3) Editorial
  1426: 'https://codeforces.com/blog/entry/83117', // Codeforces Round 674 (Div. 3) Editorial
  1409: 'https://codeforces.com/blog/entry/82350', // Codeforces Round 667 (Div. 3) Editorial
  1399: 'https://codeforces.com/blog/entry/81150', // Codeforces Round 661 (Div. 3) Editorial
  1385: 'https://codeforces.com/blog/entry/80250', // Codeforces Round 656 (Div. 3) Editorial
  1374: 'https://codeforces.com/blog/entry/79450', // Codeforces Round 653 (Div. 3) Editorial
  1367: 'https://codeforces.com/blog/entry/78950', // Codeforces Round 642 (Div. 3) Editorial
  1360: 'https://codeforces.com/blog/entry/77850', // Codeforces Round 644 (Div. 3) Editorial
  1353: 'https://codeforces.com/blog/entry/77350', // Codeforces Round 637 (Div. 3) Editorial
  1343: 'https://codeforces.com/blog/entry/76350', // Codeforces Round 636 (Div. 3) Editorial
  1335: 'https://codeforces.com/blog/entry/75950', // Codeforces Round 634 (Div. 3) Editorial
  1328: 'https://codeforces.com/blog/entry/75250', // Codeforces Round 629 (Div. 3) Editorial
  1311: 'https://codeforces.com/blog/entry/74250', // Codeforces Round 624 (Div. 3) Editorial
  1296: 'https://codeforces.com/blog/entry/73550', // Codeforces Round 617 (Div. 3) Editorial
  1283: 'https://codeforces.com/blog/entry/72550', // Codeforces Round 609 (Div. 3) Editorial
  1272: 'https://codeforces.com/blog/entry/72150', // Codeforces Round 605 (Div. 3) Editorial
  1256: 'https://codeforces.com/blog/entry/71150', // Codeforces Round 598 (Div. 3) Editorial
  1249: 'https://codeforces.com/blog/entry/70750', // Codeforces Round 595 (Div. 3) Editorial
  1234: 'https://codeforces.com/blog/entry/70150', // Codeforces Round 590 (Div. 3) Editorial
  1213: 'https://codeforces.com/blog/entry/69450', // Codeforces Round 582 (Div. 3) Editorial
  1203: 'https://codeforces.com/blog/entry/69050', // Codeforces Round 579 (Div. 3) Editorial
  1183: 'https://codeforces.com/blog/entry/67950', // Codeforces Round 570 (Div. 3) Editorial
  1176: 'https://codeforces.com/blog/entry/67550', // Codeforces Round 565 (Div. 3) Editorial
  1154: 'https://codeforces.com/blog/entry/66550', // Codeforces Round 553 (Div. 3) Editorial
  1144: 'https://codeforces.com/blog/entry/66150', // Codeforces Round 547 (Div. 3) Editorial
  1133: 'https://codeforces.com/blog/entry/65650', // Codeforces Round 543 (Div. 3) Editorial
  1118: 'https://codeforces.com/blog/entry/65250', // Codeforces Round 539 (Div. 3) Editorial
  1108: 'https://codeforces.com/blog/entry/64750', // Codeforces Round 535 (Div. 3) Editorial
  1097: 'https://codeforces.com/blog/entry/64350', // Hello 2019 Editorial
  1095: 'https://codeforces.com/blog/entry/64150', // Codeforces Round 529 (Div. 3) Editorial
  1092: 'https://codeforces.com/blog/entry/63950', // Codeforces Round 527 (Div. 3) Editorial
  1077: 'https://codeforces.com/blog/entry/63250', // Codeforces Round 521 (Div. 3) Editorial
  1066: 'https://codeforces.com/blog/entry/62350', // Codeforces Round 515 (Div. 3) Editorial
  1041: 'https://codeforces.com/blog/entry/61850', // Codeforces Round 509 (Div. 2) Editorial
  1029: 'https://codeforces.com/blog/entry/61450', // Codeforces Round 506 (Div. 3) Editorial
  1006: 'https://codeforces.com/blog/entry/60650', // Codeforces Round 498 (Div. 3) Editorial
  1003: 'https://codeforces.com/blog/entry/60450', // Codeforces Round 494 (Div. 3) Editorial
  977: 'https://codeforces.com/blog/entry/59250'   // Codeforces Round 479 (Div. 3) Editorial
};

export const getEditorialUrl = (contestId) => {
  const cid = Number(contestId);
  if (!cid) return null;
  return OFFICIAL_EDITORIAL_MAP[cid] || `https://codeforces.com/contest/${cid}`;
};

