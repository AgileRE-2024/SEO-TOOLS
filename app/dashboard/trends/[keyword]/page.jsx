// app/analyse/page.server.jsx
"use server";

import IndonesiaMap from "@/components/chart/indo-map";
import NetworkGraph from "@/components/chart/network-graph";
import Table from "@/components/chart/table";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { convertToNodePairs } from "@/lib/utils/convertToNodePairs";
import { countKeywords } from "@/lib/utils/countKeyword";
import {
  ensureUserExists,
  updateKeywordHistory,
} from "@/lib/services/userService";

export default async function Analyse({ params }) {
  const keyword = decodeURIComponent(params.keyword);

  // const [relatedKeywordResponse, geoMapResponse] = await Promise.all([
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_URL}/api/relatedQueries?keyword=${keyword}`,
  //     { next: { revalidate: 300 } }
  //   ),
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_URL}/api/googletrend/interest-by-region?keyword=${keyword}`,
  //     { next: { revalidate: 300 } }
  //   ),
  // ]);

  let keywordData = {
    mainKeyword: "sistem informasi",
    relatedKeyword: [
      {
        mainKeyword: "Sistem Informasi belajar apa",
        relatedKeyword: [
          {
            mainKeyword: "Apakah jurusan Sistem Informasi sulit",
            relatedKeyword: [
              {
                mainKeyword:
                  "Lebih sulit Sistem Informasi atau Teknik Informatika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh Soal Tes masuk jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Fakta jurusan sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi harus pintar matematika",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan sistem informasi banyak peluang kerja",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem Informasi kerja apa",
            relatedKeyword: [
              {
                mainKeyword: "Pekerjaan lulusan Sistem Informasi dan Gajinya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah lulusan sistem informasi bisa kerja di bank",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi gelarnya apa",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah lulusan Sistem Informasi bisa jadi PNS",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi Terbaik di Indonesia",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan IPA atau IPS yang banyak peluang kerja",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi UI ipa atau IPS",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem Informasi gelarnya apa",
            relatedKeyword: [
              {
                mainKeyword: "Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Penulisan gelar Sarjana Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi S2",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sarjana Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Teknik Informatika gelarnya apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sarjana Sistem Informasi Gunadarma",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Penulisan gelar Sarjana Teknik Informatika",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Materi sistem informasi",
            relatedKeyword: [
              {
                mainKeyword: "Materi sistem informasi PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Fungsi sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Komponen sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Pengertian sistem informasi menurut para ahli",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Materi Sistem Informasi semester 1",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Pengertian sistem informasi dan Contohnya",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem Informasi Fakultas apa",
            relatedKeyword: [
              {
                mainKeyword: "Sistem Informasi Fakultas apa di UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem informasi fakultas apa di ui",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi fakultas apa di bsi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi fakultas apa di Gunadarma",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi UT",
            relatedKeyword: [
              {
                mainKeyword: "Mata Kuliah Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi UT biaya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi UT Akreditasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi UT semester 1",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Akademik UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi semester 1",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Mata Kuliah Sistem Informasi semester 1",
            relatedKeyword: [
              {
                mainKeyword: "Mata Kuliah Sistem Informasi semester 1 UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi semester 2",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi Semester 3",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi Semester 5",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Materi kuliah sistem informasi PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi UI",
                relatedKeyword: [],
              },
            ],
          },
        ],
      },
      {
        mainKeyword: "Jurusan Sistem Informasi",
        relatedKeyword: [
          {
            mainKeyword: "Apakah jurusan Sistem Informasi sulit",
            relatedKeyword: [
              {
                mainKeyword:
                  "Lebih sulit Sistem Informasi atau Teknik Informatika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh Soal Tes masuk jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Fakta jurusan sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi harus pintar matematika",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan sistem informasi banyak peluang kerja",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi Terbaik di Indonesia",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan IPA atau IPS yang banyak peluang kerja",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi UI ipa atau IPS",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi kerja apa",
            relatedKeyword: [
              {
                mainKeyword: "Pekerjaan lulusan Sistem Informasi dan Gajinya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah lulusan sistem informasi bisa kerja di bank",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi UT",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
            relatedKeyword: [
              {
                mainKeyword:
                  "Universitas dengan Jurusan Sistem Informasi akreditasi A",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Universitas Negeri yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Universitas yang ada jurusan Sistem Informasi di Bandung",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Universitas yang ada jurusan Sistem Informasi di Jakarta",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Universitas dengan Jurusan Sistem Informasi Terbaik di Indonesia",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Universitas Negeri jurusan Sistem Informasi di Jogja",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas jurusan Sistem Informasi di Jogja",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Universitas Swasta dengan Jurusan Sistem Informasi Terbaik",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi belajar apa",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Fakultas apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Teknologi Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi semester 1",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi UT",
            relatedKeyword: [
              {
                mainKeyword: "Mata Kuliah Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi UT biaya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi UT Akreditasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi UT semester 1",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Akademik UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi Terbaik di Indonesia",
            relatedKeyword: [
              {
                mainKeyword:
                  "Universitas dengan Jurusan Sistem Informasi akreditasi A",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Terbaik di Indonesia 2023",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Universitas Swasta dengan Jurusan Sistem Informasi Terbaik",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Terbaik di Indonesia 2024",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Universitas dengan Jurusan Sistem Informasi Terbaik",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Universitas swasta dengan Jurusan Sistem Informasi akreditasi A",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Universitas Negeri yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Gelar Jurusan Sistem Informasi",
            relatedKeyword: [
              {
                mainKeyword: "Penulisan gelar Sarjana Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi S2",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sarjana Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sarjana Teknik Informatika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Penulisan gelar Sarjana Teknik Informatika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sarjana Sistem Informasi Gunadarma",
                relatedKeyword: [],
              },
            ],
          },
        ],
      },
      {
        mainKeyword: "Sistem Informasi kerja apa",
        relatedKeyword: [
          {
            mainKeyword: "Pekerjaan lulusan Sistem Informasi dan Gajinya",
            relatedKeyword: [
              {
                mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah lulusan sistem informasi bisa kerja di bank",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gaji Sistem Informasi S1",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah lulusan Sistem Informasi bisa jadi PNS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lulusan Sistem Informasi gelarnya apa",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
            relatedKeyword: [
              {
                mainKeyword: "Lowongan kerja Sistem Informasi BUMN",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lowongan kerja Sistem Informasi Fresh Graduate",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Perusahaan yang membutuhkan lulusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan sistem informasi bisa kerja di bank",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gaji lulusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Loker Sistem Informasi 2024",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lowongan kerja Teknik Informatika",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Apakah lulusan sistem informasi bisa kerja di bank",
            relatedKeyword: [
              {
                mainKeyword: "Apakah lulusan Sistem Informasi bisa jadi PNS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Pekerjaan lulusan Sistem Informasi dan Gajinya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gaji lulusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lulusan sistem Informasi gelar",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Apakah jurusan Sistem Informasi sulit",
            relatedKeyword: [
              {
                mainKeyword:
                  "Lebih sulit Sistem Informasi atau Teknik Informatika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh Soal Tes masuk jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Fakta jurusan sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi harus pintar matematika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan sistem Informasi bisa jadi guru",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem Informasi belajar apa",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi gelarnya apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Materi sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Fakultas apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi semester 1",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem Informasi gelarnya apa",
            relatedKeyword: [
              {
                mainKeyword: "Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Penulisan gelar Sarjana Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi S2",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sarjana Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Informatika gelarnya apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sarjana Sistem Informasi Gunadarma",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Penulisan gelar Sarjana Teknik Informatika",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword:
              "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
            relatedKeyword: [
              {
                mainKeyword:
                  "Apakah lulusan sistem informasi bisa kerja di bank",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Pekerjaan lulusan Sistem Informasi dan Gajinya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah lulusan Sistem Informasi bisa jadi PNS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan sistem Informasi bisa jadi guru",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gaji lulusan Sistem Informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi Terbaik di Indonesia",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan IPA atau IPS yang banyak peluang kerja",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Manajemen Informatika IPA atau IPS",
                relatedKeyword: [],
              },
            ],
          },
        ],
      },
      {
        mainKeyword: "Contoh sistem informasi",
        relatedKeyword: [
          {
            mainKeyword: "10 contoh sistem informasi",
            relatedKeyword: [
              {
                mainKeyword:
                  "contoh sistem informasi dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 contoh sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi sederhana",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh aplikasi sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Contoh sistem informasi manajemen dalam perusahaan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh Sistem informasi BERBASIS WEB",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "jenis-jenis sistem informasi manajemen dan contohnya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "contoh sistem dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "contoh sistem informasi dalam kehidupan sehari-hari",
            relatedKeyword: [
              {
                mainKeyword: "10 contoh sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "contoh sistem dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "contoh penerapan teknologi informasi dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi sederhana",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 contoh sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "apa saja sistem di kehidupan sehari-hari yang memiliki konsep informatika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh Sistem informasi BERBASIS WEB",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi manajemen",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Contoh sistem informasi sederhana",
            relatedKeyword: [
              {
                mainKeyword: "10 contoh sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh Sistem informasi BERBASIS WEB",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 contoh Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "contoh sistem informasi manajemen dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword: "contoh sistem dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 contoh sistem",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh aplikasi sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Contoh aplikasi sistem informasi manajemen pada perusahaan",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Contoh Sistem informasi BERBASIS WEB",
            relatedKeyword: [
              {
                mainKeyword:
                  "Contoh Proposal Skripsi sistem informasi BERBASIS WEB",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh skripsi Sistem Informasi BERBASIS WEB",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Judul Skripsi Sistem Informasi BERBASIS WEB",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Judul Skripsi Teknik Informatika Berbasis web yang Mudah",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Judul Skripsi Sistem Informasi di Kantor Desa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh skripsi Sistem Informasi S1 PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Judul Skripsi Sistem Informasi yang mudah",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh Judul Aplikasi Berbasis Web",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Contoh sistem informasi manajemen",
            relatedKeyword: [
              {
                mainKeyword:
                  "contoh sistem informasi manajemen dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Contoh sistem informasi manajemen dalam organisasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem Informasi Manajemen di sekolah",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Contoh sistem informasi manajemen dalam pendidikan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh aplikasi sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Contoh PENERAPAN sistem informasi manajemen pada perusahaan",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "jenis-jenis sistem informasi manajemen dan contohnya",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Contoh sistem informasi manajemen perusahaan jasa",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "5 contoh sistem",
            relatedKeyword: [
              {
                mainKeyword: "10 Contoh sistem",
                relatedKeyword: [],
              },
              {
                mainKeyword: "10 contoh sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 contoh Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "contoh sistem dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi sederhana",
                relatedKeyword: [],
              },
              {
                mainKeyword: "10 contoh informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "jenis-jenis sistem informasi dan contohnya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "contoh informasi dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Contoh informasi",
            relatedKeyword: [
              {
                mainKeyword: "3 contoh informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 contoh Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh informasi yang lengkap",
                relatedKeyword: [],
              },
              {
                mainKeyword: "10 contoh informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh informasi yang baik",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh informasi data",
                relatedKeyword: [],
              },
              {
                mainKeyword: "contoh informasi dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword: "10 contoh data dan informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "5 contoh Informasi",
            relatedKeyword: [
              {
                mainKeyword: "10 contoh informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "3 contoh informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh informasi yang lengkap",
                relatedKeyword: [],
              },
              {
                mainKeyword: "contoh informasi dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 contoh komunikasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 contoh sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "10 contoh sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi sederhana",
                relatedKeyword: [],
              },
            ],
          },
        ],
      },
      {
        mainKeyword: "Sistem informasi Manajemen",
        relatedKeyword: [
          {
            mainKeyword: "Sistem informasi Manajemen PDF",
            relatedKeyword: [
              {
                mainKeyword: "sistem informasi manajemen kenneth c. laudon pdf",
                relatedKeyword: [],
              },
              {
                mainKeyword: "MAKALAH sistem informasi Manajemen PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Buku Sistem Informasi Manajemen Edisi 13 PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Download ebook Sistem Informasi Manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurnal sistem informasi Manajemen PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Download e-book Sistem Informasi PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "buku sistem informasi manajemen gordon b. davis pdf",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Materi sistem informasi manajemen",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Contoh sistem informasi manajemen",
            relatedKeyword: [
              {
                mainKeyword:
                  "contoh sistem informasi manajemen dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Contoh sistem informasi manajemen dalam organisasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem Informasi Manajemen di sekolah",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Contoh sistem informasi manajemen dalam pendidikan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh aplikasi sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Contoh PENERAPAN sistem informasi manajemen pada perusahaan",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "jenis-jenis sistem informasi manajemen dan contohnya",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Contoh sistem informasi manajemen perusahaan jasa",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi Manajemen",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Fakultas apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Materi sistem informasi manajemen",
            relatedKeyword: [
              {
                mainKeyword: "Materi Sistem Informasi Manajemen PPT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Materi sistem informasi Manajemen PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem informasi manajemen menurut para ahli",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Fungsi sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Tujuan sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Manfaat Sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Komponen sistem informasi manajemen",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem informasi manajemen menurut para ahli",
            relatedKeyword: [
              {
                mainKeyword:
                  "Sistem informasi Manajemen menurut para ahli 2020",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Pengertian sistem informasi Manajemen menurut para ahli pdf",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Sistem informasi manajemen menurut para ahli 2018",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Jurnal sistem informasi manajemen menurut para ahli",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Fungsi sistem informasi manajemen Menurut para ahli",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem informasi Manajemen PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "5 pengertian dari sistem informasi manajemen Menurut para Ahli",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Komponen sistem informasi manajemen",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem informasi manajemen PENDIDIKAN",
            relatedKeyword: [
              {
                mainKeyword: "Sistem informasi Manajemen PENDIDIKAN PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi manajemen pendidikan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurnal sistem informasi manajemen PENDIDIKAN",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Buku Sistem Informasi Manajemen Pendidikan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Makalah sistem informasi manajemen PENDIDIKAN",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Tujuan sistem informasi manajemen PENDIDIKAN",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Ruang lingkup Sistem informasi manajemen PENDIDIKAN",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Artikel sistem informasi manajemen PENDIDIKAN",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem Informasi Manajemen PPT",
            relatedKeyword: [
              {
                mainKeyword: "Download PPT Sistem Informasi Manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "PPT Sistem Informasi Manajemen PERTEMUAN 1",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Konsep Dasar Sistem Informasi Manajemen ppt",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Materi sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem informasi Manajemen PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Makalah sistem informasi Manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Implementasi sistem informasi manajemen PPT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Buku Sistem Informasi Manajemen",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Tujuan sistem informasi manajemen",
            relatedKeyword: [
              {
                mainKeyword: "3 tujuan sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Tujuan sistem informasi Manajemen Jurnal",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Tujuan sistem informasi manajemen menurut para ahli",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Komponen sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jenis sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "8 manfaat sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Karakteristik sistem informasi manajemen",
                relatedKeyword: [],
              },
            ],
          },
        ],
      },
      {
        mainKeyword: "Sistem Informasi Fakultas apa",
        relatedKeyword: [
          {
            mainKeyword: "Sistem Informasi Fakultas apa di UT",
            relatedKeyword: [
              {
                mainKeyword: "Mata Kuliah Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi UT biaya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi UT Akreditasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan yang ada di Universitas Terbuka",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Tagline Universitas Terbuka adalah",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi UT semester 1",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Berapa Fakultas di UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem informasi fakultas apa di ui",
            relatedKeyword: [
              {
                mainKeyword: "Biaya kuliah Sistem Informasi UI",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi UI",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi UI passing Grade",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi UI akreditasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Fakultas apa di UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan di Fakultas Ilmu Komputer UI",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi semester 1",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi S2",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Apakah jurusan Sistem Informasi sulit",
            relatedKeyword: [
              {
                mainKeyword:
                  "Lebih sulit Sistem Informasi atau Teknik Informatika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh Soal Tes masuk jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Fakta jurusan sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi harus pintar matematika",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan sistem informasi banyak peluang kerja",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi Terbaik di Indonesia",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Gelar Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan IPA atau IPS yang banyak peluang kerja",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Manajemen Informatika IPA atau IPS",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem Informasi fakultas apa di bsi",
            relatedKeyword: [
              {
                mainKeyword: "Mata kuliah Sistem Informasi BSI",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi BSI Akreditasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan di BSI",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Kode Mata Kuliah BSI",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Berapa biaya kuliah di BSI per semester",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas BSI dimana",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Biaya kuliah BSI",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas BSI Jakarta Timur",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem Informasi fakultas apa di Gunadarma",
            relatedKeyword: [],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi belajar apa",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Fakultas apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Teknologi Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Universitas yang ada Jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi semester 1",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem Informasi kerja apa",
            relatedKeyword: [
              {
                mainKeyword: "Pekerjaan lulusan Sistem Informasi dan Gajinya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah lulusan sistem informasi bisa kerja di bank",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi gelarnya apa",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
            ],
          },
        ],
      },
      {
        mainKeyword: "Apakah jurusan Sistem Informasi sulit",
        relatedKeyword: [
          {
            mainKeyword: "Lebih sulit Sistem Informasi atau Teknik Informatika",
            relatedKeyword: [
              {
                mainKeyword: "Bagusan Teknik Informatika atau Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "PERBEDAAN prospek kerja Sistem Informasi dan Teknik Informatika",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Peluang kerja Teknik Informatika dan sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lebih baik sistem Informasi atau Manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Hubungan Sistem informasi dan teknik Informatika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Contoh Soal Tes masuk jurusan Sistem Informasi",
            relatedKeyword: [
              {
                mainKeyword: "Soal Sistem Informasi Manajemen dan jawabannya",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Soal Pilihan Ganda Sistem informasi dan jawabannya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "PERTANYAAN tentang sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Soal olimpiade Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Soal UTS Pengantar Sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Soal Arsitektur sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Soal dan Jawaban Analisa PERANCANGAN Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Soal kasus Sistem informasi Manajemen",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Kesulitan jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Kelebihan dan kekurangan Jurusan sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi jurusan IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi harus bisa coding",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Nganggur",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan yang tidak ada matematika",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Fakta jurusan sistem Informasi",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Prospek kerja Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Lebih sulit Sistem Informasi atau Teknik Informatika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh Soal Tes masuk jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi UT",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword:
              "Apakah jurusan Sistem Informasi harus pintar matematika",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi harus bisa coding",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi banyak hitungan",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan yang tidak ada matematika",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Kesulitan jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Matematika Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Kelebihan dan kekurangan Jurusan sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Apakah jurusan sistem informasi banyak peluang kerja",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Pekerjaan lulusan Sistem Informasi dan Gajinya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Lowongan kerja jurusan Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Apakah jurusan Sistem Informasi bisa bekerja di rumah sakit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan sistem Informasi bisa jadi guru",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi UT",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
            relatedKeyword: [],
          },
          {
            mainKeyword: "Mata kuliah Sistem Informasi",
            relatedKeyword: [
              {
                mainKeyword: "Mata Kuliah Sistem Informasi semester 1",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi UI",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi Telkom University",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Materi kuliah sistem informasi PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi semester 2",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi BSI",
                relatedKeyword: [],
              },
            ],
          },
        ],
      },
      {
        mainKeyword: "Materi sistem informasi",
        relatedKeyword: [
          {
            mainKeyword: "Materi sistem informasi PDF",
            relatedKeyword: [
              {
                mainKeyword: "Buku sistem informasi PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "eBook Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Konsep Dasar sistem informasi PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Buku PENGANTAR Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurnal Konsep sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Makalah Konsep Dasar sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Konsep Dasar sistem informasi Manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Konsep Sistem Informasi PPT",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Contoh sistem informasi",
            relatedKeyword: [
              {
                mainKeyword: "10 contoh sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "contoh sistem informasi dalam kehidupan sehari-hari",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi sederhana",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh Sistem informasi BERBASIS WEB",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 contoh sistem",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 contoh Informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Fungsi sistem informasi",
            relatedKeyword: [
              {
                mainKeyword: "Fungsi sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Contoh sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Komponen sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Fungsi sistem informasi menurut para ahli",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jenis-jenis Sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Pengertian sistem informasi menurut para ahli",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "6 komponen sistem informasi dan Contohnya",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Komponen sistem informasi",
            relatedKeyword: [
              {
                mainKeyword: "6 komponen sistem informasi dan Contohnya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Komponen sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "6 komponen sistem informasi Manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Komponen sistem informasi PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "5 komponen sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Komponen sistem informasi menurut para ahli",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurnal komponen sistem Informasi Manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Komponen sistem informasi manajemen PENDIDIKAN",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Pengertian sistem informasi menurut para ahli",
            relatedKeyword: [
              {
                mainKeyword:
                  "Pengertian sistem informasi menurut para ahli 5 tahun terakhir",
                relatedKeyword: [],
              },
              {
                mainKeyword:
                  "Pengertian Sistem informasi menurut para ahli dan daftar PUSTAKA",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem informasi menurut para ahli terbaru",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem informasi menurut para ahli jurnal",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Pengertian informasi menurut para ahli jurnal",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurnal pengertian sistem informasi pdf",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Tujuan sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Komponen sistem informasi",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Materi Sistem Informasi semester 1",
            relatedKeyword: [
              {
                mainKeyword: "Materi kuliah sistem informasi PDF",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata kuliah Sistem Informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi semester 1 UT",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Fakultas apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Mata Kuliah Sistem Informasi Semester 3",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Materi Sistem Informasi Teknik Informatika",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Sistem Informasi belajar apa",
            relatedKeyword: [
              {
                mainKeyword: "Apakah jurusan Sistem Informasi sulit",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi kerja apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi IPA atau IPS",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi gelarnya apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Teknologi Informasi belajar apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Materi sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Sistem Informasi Fakultas apa",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jurusan Sistem Informasi UT",
                relatedKeyword: [],
              },
            ],
          },
          {
            mainKeyword: "Pengertian sistem informasi dan Contohnya",
            relatedKeyword: [
              {
                mainKeyword: "6 komponen sistem informasi dan Contohnya",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Fungsi sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Pengertian sistem informasi menurut para ahli",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Jenis-jenis Sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Tujuan sistem informasi",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Tujuan sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Manfaat Sistem informasi manajemen",
                relatedKeyword: [],
              },
              {
                mainKeyword: "Manfaat sistem informasi menurut para ahli",
                relatedKeyword: [],
              },
            ],
          },
        ],
      },
    ],
  };

  const [geoMapResponse] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/googletrend/interest-by-region?keyword=${keyword}`,
      { next: { revalidate: 300 } }
    ),
  ]);

  // const keywordData = await relatedKeywordResponse.json();
  const geoMapDataFull = await geoMapResponse.json();
  const geoMapData = geoMapDataFull.default.geoMapData;

  const dataForNetworkGraph = convertToNodePairs(keywordData);
  const countKeywordDepth = countKeywords(keywordData);

  const session = await getServerSession(authOptions);

  if (session) {
    const userId = session.user.id;
    await ensureUserExists(userId);
    await updateKeywordHistory(userId, keyword);
  }

  return (
    <div
      className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-auto"
      data-testid="analysis-result"
    >
      <div className="w-full flex flex-col gap-10" data-testid="network-graph">
        <NetworkGraph
          data={dataForNetworkGraph}
          detail={countKeywordDepth}
          title={keywordData.mainKeyword}
        />
        <section
          className="h-[50vh] overflow-scroll relative"
          data-testid="related-keywords-table"
        >
          <Table data={countKeywordDepth} />
        </section>
        <section className="h-fit">
          <section
            className="flex gap-8 items-center justify-between h-[30rem] bg-[#2b2b2b] p-8 rounded-lg"
            data-testid="indonesia-map"
          >
            <IndonesiaMap geoMapData={geoMapData} />
            <div className="w-[95%] h-full">
              <h2 className="text-custom-teal text-xl text-center font-bold pb-4">
                Minat Menurut Sub-Wilayah
              </h2>
              <div className="h-[24rem] overflow-y-auto">
                <table className="w-full border-collapse text-white">
                  <thead>
                    <tr className="text-left font-bold border-b border-gray-600">
                      <th className="p-3">Urutan Ke-</th>
                      <th className="p-3">Wilayah</th>
                      <th className="p-3">Minat Pencarian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geoMapData.map((item, index) => (
                      <tr
                        id={item.id}
                        key={item.id}
                        className="border-b border-gray-600"
                      >
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{item.geoName}</td>
                        <td className="p-3">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
