import { UserSession } from "@/interfaces/UserSession"
import { ECacheKeys } from "@/keys"
import { UndefinedInitialDataOptions, useSuspenseQuery } from "@tanstack/react-query"
import { useDebugValue } from "react"

type Options<TData> = Omit<UndefinedInitialDataOptions<UserSession, Error, TData>, "queryKey">

export function useUserQuery<TData>(options = {} as Options<TData>) {
  const query = useSuspenseQuery<UserSession, Error, TData>({
    queryKey: ECacheKeys.user(user.id),
    queryFn: () => user,
    refetchOnWindowFocus: false,
    ...options,
  })
  useDebugValue(query)
  return query
}

const user = {
  id: "ef499b10-d774-4a13-b585-7e29541430cc",
  username: "vitormarkis",
  profilePicture: "https://github.com/vitormarkis.png",
  columns: [
    {
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
      id: "a6718634-beb1-4352-a089-35ae072649b0",
      todos: [
        {
          id: "540b5978-d160-4a86-a29b-7f4fabfd6cc7",
          idColumn: "a6718634-beb1-4352-a089-35ae072649b0",
          isDone: false,
          text: "moment",
        },
        {
          id: "0810cb7e-c8f5-49a7-9c2e-8da25e38baa8",
          idColumn: "a6718634-beb1-4352-a089-35ae072649b0",
          isDone: true,
          text: "ljsg2nzyt5i",
        },
        {
          id: "86d3abb3-7282-4869-84ae-2c4fed4a5d3a",
          idColumn: "a6718634-beb1-4352-a089-35ae072649b0",
          isDone: false,
          text: "y3i6p6c5wod",
        },
      ],
    },
    {
      id: "88fef297-88b2-442f-b60b-db666cbe8164",
      todos: [
        {
          id: "5203d418-30ee-45d7-ab9c-fb7232cdc2dd",
          idColumn: "88fef297-88b2-442f-b60b-db666cbe8164",
          isDone: false,
          text: "yrv04a3pmjk",
        },
        {
          id: "faf6245f-0c07-4978-9008-5f147341931c",
          idColumn: "88fef297-88b2-442f-b60b-db666cbe8164",
          isDone: false,
          text: "6r7fc1u0lkl",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "f1f0b04c-8e56-444f-a7b7-8f4c04ae3682",
      todos: [
        {
          id: "723728ec-315f-453f-90d7-6dd21ae758c8",
          idColumn: "f1f0b04c-8e56-444f-a7b7-8f4c04ae3682",
          isDone: false,
          text: "pe3enp3eb4j",
        },
        {
          id: "634da54a-c7bf-4aa8-afcf-b473a6a036f7",
          idColumn: "f1f0b04c-8e56-444f-a7b7-8f4c04ae3682",
          isDone: false,
          text: "wwsbamxfp6o",
        },
        {
          id: "98ca10e7-935c-4b6d-b749-7fb4b483d0aa",
          idColumn: "f1f0b04c-8e56-444f-a7b7-8f4c04ae3682",
          isDone: true,
          text: "pavocipxs4",
        },
        {
          id: "453deee3-9c5c-45d4-a5b8-000047549f9d",
          idColumn: "f1f0b04c-8e56-444f-a7b7-8f4c04ae3682",
          isDone: false,
          text: "tre7z37eak",
        },
        {
          id: "5b7b3d21-4744-43d5-98ad-ab98dddc2e84",
          idColumn: "f1f0b04c-8e56-444f-a7b7-8f4c04ae3682",
          isDone: true,
          text: "s1gake4msuo",
        },
        {
          id: "50849e23-0624-4de0-8adf-393a1704d194",
          idColumn: "f1f0b04c-8e56-444f-a7b7-8f4c04ae3682",
          isDone: true,
          text: "6g6a0qln0m2",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "aace83ab-c425-477b-9c6c-2b1cf69e498b",
      todos: [
        {
          id: "ea5faec4-8bba-463d-9ec0-3f578322de3e",
          idColumn: "aace83ab-c425-477b-9c6c-2b1cf69e498b",
          isDone: false,
          text: "7ry9agsgdpq",
        },
        {
          id: "2de4e2e4-29e6-468b-9ab2-069cd3b4c3e8",
          idColumn: "aace83ab-c425-477b-9c6c-2b1cf69e498b",
          isDone: false,
          text: "8k4wwczfgq7",
        },
        {
          id: "21ff02b9-73b1-48d6-9bf4-0a5549b1a494",
          idColumn: "aace83ab-c425-477b-9c6c-2b1cf69e498b",
          isDone: true,
          text: "t7h1m68ktba",
        },
        {
          id: "63260e41-104c-435a-9fd1-517d5a60a46d",
          idColumn: "aace83ab-c425-477b-9c6c-2b1cf69e498b",
          isDone: false,
          text: "xfsxtw9uf4",
        },
        {
          id: "619be6de-8a6f-475b-a1fd-9dfe893a06c3",
          idColumn: "aace83ab-c425-477b-9c6c-2b1cf69e498b",
          isDone: false,
          text: "uh00m9aknh",
        },
        {
          id: "8d26d121-1a8e-4578-985d-39dc970f3cd7",
          idColumn: "aace83ab-c425-477b-9c6c-2b1cf69e498b",
          isDone: false,
          text: "1z4y1n8tdh5h",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "61a6b284-a9fa-472b-987d-19ccdf43400b",
      todos: [
        {
          id: "bd44f29b-ea98-4b4e-a925-784541ea3d8f",
          idColumn: "61a6b284-a9fa-472b-987d-19ccdf43400b",
          isDone: true,
          text: "eat",
        },
        {
          id: "adf11228-b0e5-41b2-b958-dbba35e04c37",
          idColumn: "61a6b284-a9fa-472b-987d-19ccdf43400b",
          isDone: true,
          text: "4r9pvhaiok",
        },
        {
          id: "5cbd6542-4929-41de-945e-b661289df5bb",
          idColumn: "61a6b284-a9fa-472b-987d-19ccdf43400b",
          isDone: false,
          text: "xutilw5i8vd",
        },
        {
          id: "72ea70eb-2a4a-4b59-a2b0-75b52f4cdccf",
          idColumn: "61a6b284-a9fa-472b-987d-19ccdf43400b",
          isDone: false,
          text: "pwmtgt3xda",
        },
        {
          id: "29d5d207-bc1b-4283-b179-3e85d81df199",
          idColumn: "61a6b284-a9fa-472b-987d-19ccdf43400b",
          isDone: false,
          text: "re-render",
        },
        {
          id: "1db82f7d-8d0b-424b-a977-75931f2b5052",
          idColumn: "61a6b284-a9fa-472b-987d-19ccdf43400b",
          isDone: false,
          text: "horse",
        },
        {
          id: "78da51e2-e614-4f5d-bdfa-2a1b91a074c9",
          idColumn: "61a6b284-a9fa-472b-987d-19ccdf43400b",
          isDone: false,
          text: "rabbit",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "09c00cb0-aa19-4217-b228-1c52392e855c",
      todos: [
        {
          id: "d06638a2-d954-4a80-9ef1-447d63b3218c",
          idColumn: "09c00cb0-aa19-4217-b228-1c52392e855c",
          isDone: true,
          text: "jump",
        },
        {
          id: "5318cb4d-32de-44e4-b045-677ff9344984",
          idColumn: "09c00cb0-aa19-4217-b228-1c52392e855c",
          isDone: false,
          text: "name",
        },
        {
          id: "e7e25f23-7f07-4dc1-8827-4db64105bf04",
          idColumn: "09c00cb0-aa19-4217-b228-1c52392e855c",
          isDone: true,
          text: "try",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "850c4aa3-d3a1-413b-bede-aa69d2e88dc8",
      todos: [
        {
          id: "244498e9-67a9-4b8b-b4f7-2094117b08bc",
          idColumn: "850c4aa3-d3a1-413b-bede-aa69d2e88dc8",
          isDone: true,
          text: "n0n7a1hlfx9",
        },
        {
          id: "25dd43cd-601e-4c5f-af57-3f7a824ad0b0",
          idColumn: "850c4aa3-d3a1-413b-bede-aa69d2e88dc8",
          isDone: true,
          text: "8pubnhgr7vj",
        },
        {
          id: "25231912-f830-49b9-9ea6-a807b5c25cdb",
          idColumn: "850c4aa3-d3a1-413b-bede-aa69d2e88dc8",
          isDone: true,
          text: "mvd3cfcxze",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "b35aaa90-7ff8-45fa-bb20-9b559e60e01b",
      todos: [
        {
          id: "ab640173-84e1-4821-9111-7e337ceb1cbd",
          idColumn: "b35aaa90-7ff8-45fa-bb20-9b559e60e01b",
          isDone: false,
          text: "just",
        },
        {
          id: "8eb8ab1c-bdff-45fc-986e-1c571e3a9feb",
          idColumn: "b35aaa90-7ff8-45fa-bb20-9b559e60e01b",
          isDone: true,
          text: "uuid",
        },
        {
          id: "c5f65fd9-a4ff-45e7-b8f2-79e423e7dcbf",
          idColumn: "b35aaa90-7ff8-45fa-bb20-9b559e60e01b",
          isDone: true,
          text: "change",
        },
        {
          id: "c4d76543-54f3-4e77-8580-657e821f816a",
          idColumn: "b35aaa90-7ff8-45fa-bb20-9b559e60e01b",
          isDone: false,
          text: "0.60b87lwcml",
        },
        {
          id: "8b513a5e-2ec3-415d-9ba8-1ac30309d6a5",
          idColumn: "b35aaa90-7ff8-45fa-bb20-9b559e60e01b",
          isDone: false,
          text: "leave",
        },
        {
          id: "dbd9f31e-8292-452c-ad1b-a2ec76d26a89",
          idColumn: "b35aaa90-7ff8-45fa-bb20-9b559e60e01b",
          isDone: false,
          text: "k9pf6r3z31",
        },
        {
          id: "886fd0dd-3ba0-4793-b64c-5d8ecb1dfa06",
          idColumn: "b35aaa90-7ff8-45fa-bb20-9b559e60e01b",
          isDone: false,
          text: "evk045otyxl",
        },
        {
          id: "914a1471-3d25-4869-9de9-96452725a6b1",
          idColumn: "b35aaa90-7ff8-45fa-bb20-9b559e60e01b",
          isDone: false,
          text: "national",
        },
        {
          id: "ac66e4af-500e-4382-a8a2-c4877c0f7342",
          idColumn: "b35aaa90-7ff8-45fa-bb20-9b559e60e01b",
          isDone: false,
          text: "inter",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "db5f1beb-01d2-4c93-a659-a4e1c0fee111",
      todos: [
        {
          id: "0ad192cc-2902-4cd6-aa2c-3ef4108c4c6e",
          idColumn: "db5f1beb-01d2-4c93-a659-a4e1c0fee111",
          isDone: false,
          text: "0.daylmzyrh7",
        },
        {
          id: "cb0d624f-4dee-4538-ade9-c36290cc997b",
          idColumn: "db5f1beb-01d2-4c93-a659-a4e1c0fee111",
          isDone: false,
          text: "0.qr781qnyb3",
        },
        {
          id: "2aec87ac-35cc-4246-a488-b428f8d79c57",
          idColumn: "db5f1beb-01d2-4c93-a659-a4e1c0fee111",
          isDone: true,
          text: "0.jvdd73fkdu",
        },
        {
          id: "942a1712-33a5-4934-a3b6-031ce6645534",
          idColumn: "db5f1beb-01d2-4c93-a659-a4e1c0fee111",
          isDone: true,
          text: "0.2hd5xwwn0ud",
        },
        {
          id: "ae268b1c-700d-4cb2-b3b5-49a4dad1d5ff",
          idColumn: "db5f1beb-01d2-4c93-a659-a4e1c0fee111",
          isDone: false,
          text: "6jsbgyt3kma",
        },
        {
          id: "1b6db4b6-3063-49df-9d8e-c533ea62e25e",
          idColumn: "db5f1beb-01d2-4c93-a659-a4e1c0fee111",
          isDone: false,
          text: "j6m3xldjnm",
        },
        {
          id: "90a2c7cd-10be-4cef-bc75-e48f2d16e195",
          idColumn: "db5f1beb-01d2-4c93-a659-a4e1c0fee111",
          isDone: true,
          text: "text",
        },
        {
          id: "e03e397e-0b11-4fd2-8195-7104ae3e3642",
          idColumn: "db5f1beb-01d2-4c93-a659-a4e1c0fee111",
          isDone: false,
          text: "b8gayyawedq",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "cef8ff02-44dd-41f7-b702-61c60562a8bf",
      todos: [
        {
          id: "04a18a45-3b77-4c27-8835-46738c994861",
          idColumn: "cef8ff02-44dd-41f7-b702-61c60562a8bf",
          isDone: false,
          text: "0.inx4ju4l87",
        },
        {
          id: "cf151545-09df-4f28-9c32-5cbcf5c7ca74",
          idColumn: "cef8ff02-44dd-41f7-b702-61c60562a8bf",
          isDone: false,
          text: "0.x0ej7e7tamc",
        },
        {
          id: "f9245173-6a75-4c1c-a664-343bfb355f8c",
          idColumn: "cef8ff02-44dd-41f7-b702-61c60562a8bf",
          isDone: false,
          text: "gxovwmdiant",
        },
        {
          id: "50fc897e-3f48-4ccc-9e75-1c63400c59ae",
          idColumn: "cef8ff02-44dd-41f7-b702-61c60562a8bf",
          isDone: false,
          text: "second",
        },
        {
          id: "83ade642-0fc0-4d70-9272-fda520341ea7",
          idColumn: "cef8ff02-44dd-41f7-b702-61c60562a8bf",
          isDone: true,
          text: "latam",
        },
        {
          id: "72330f82-40cc-4469-9525-ed5d5c01d126",
          idColumn: "cef8ff02-44dd-41f7-b702-61c60562a8bf",
          isDone: true,
          text: "excuse",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "a8fe7dc9-445d-4d9c-8ab6-ed65e4916e77",
      todos: [
        {
          id: "1c2a14b1-c95d-4f4e-9c7a-c192901f5336",
          idColumn: "a8fe7dc9-445d-4d9c-8ab6-ed65e4916e77",
          isDone: false,
          text: "proccess",
        },
        {
          id: "b2f3e454-2067-4721-935d-04ba81c1056c",
          idColumn: "a8fe7dc9-445d-4d9c-8ab6-ed65e4916e77",
          isDone: false,
          text: "feast",
        },
        {
          id: "726c1ec2-279d-4e8d-8ccf-f778cf1407ef",
          idColumn: "a8fe7dc9-445d-4d9c-8ab6-ed65e4916e77",
          isDone: false,
          text: "swat",
        },
        {
          id: "1cd3b42d-5f27-4d04-b205-e9e715c07af0",
          idColumn: "a8fe7dc9-445d-4d9c-8ab6-ed65e4916e77",
          isDone: false,
          text: "this",
        },
        {
          id: "d7bb7ab2-eaa3-4fa1-ab07-edff2fa0103c",
          idColumn: "a8fe7dc9-445d-4d9c-8ab6-ed65e4916e77",
          isDone: false,
          text: "close",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "ba6643a6-1016-41bf-877b-2ecd05c893c8",
      todos: [
        {
          id: "9c6b4854-a92b-40ef-bc0f-1e33931cc221",
          idColumn: "ba6643a6-1016-41bf-877b-2ecd05c893c8",
          isDone: false,
          text: "phone",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "db3719d5-e93a-4aa6-9bcd-3b99654b7517",
      todos: [],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "fde5ee60-69a7-4b7d-8680-09cee5ac8682",
      todos: [
        {
          id: "680c3dc0-d786-4be1-8e39-fdc90ed8bdca",
          idColumn: "fde5ee60-69a7-4b7d-8680-09cee5ac8682",
          isDone: false,
          text: "t3dfjjm2tn",
        },
        {
          id: "abdb5a79-ad1d-4873-aa58-87fc528bf805",
          idColumn: "fde5ee60-69a7-4b7d-8680-09cee5ac8682",
          isDone: false,
          text: "eqw44ekztj8",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "6115b0dd-48a2-4e9a-b58d-c46bcaf84cca",
      todos: [
        {
          id: "b7bf8b90-ee87-4638-ac19-74fde5eb4688",
          idColumn: "6115b0dd-48a2-4e9a-b58d-c46bcaf84cca",
          isDone: false,
          text: "uv83uy4hnm",
        },
        {
          id: "63e476dd-4c1f-45f9-b11b-68a65674a5f1",
          idColumn: "6115b0dd-48a2-4e9a-b58d-c46bcaf84cca",
          isDone: false,
          text: "pd1c9sqe8x",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "1fe26269-c728-486b-8624-99fcf4b5c776",
      todos: [
        {
          id: "95c79ff4-4fb7-44ac-82cc-f9d1f54511c5",
          idColumn: "1fe26269-c728-486b-8624-99fcf4b5c776",
          isDone: false,
          text: "dflapguri8k",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
    {
      id: "ebaeee74-3d1a-417b-84b1-ccbb63014741",
      todos: [
        {
          id: "a1877357-12eb-4679-8ea2-39aca8822a29",
          idColumn: "ebaeee74-3d1a-417b-84b1-ccbb63014741",
          isDone: false,
          text: "nl1ymafpb9",
        },
        {
          id: "22872c2e-35ed-4af5-920c-cd32b0bacb81",
          idColumn: "ebaeee74-3d1a-417b-84b1-ccbb63014741",
          isDone: false,
          text: "c8w0k80m0pb",
        },
      ],
      idOwner: "ef499b10-d774-4a13-b585-7e29541430cc",
    },
  ],
}
