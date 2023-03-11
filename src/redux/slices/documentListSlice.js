import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchDocumentList = createAsyncThunk(
  "fetch/documentList",
  async (props) => {
    const response = await fetch(
      "https://gateway.scan-interfax.ru/api/v1/documents",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify(props.bodyRequest),
      }
    );
    //
    const documents = await response.json();
    return documents;
  }
);

const initialState = {
  statusDocuments: null, // loading // success // error
  documents: [],
};

const documentListSlice = createSlice({
  name: "documentList",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocumentList.fulfilled, (state, action) => {
        const regexTags = /(<([^>]+)>)/gi;
        action.payload.forEach((item) => {
          const content = item.ok.content.markup
            .replaceAll("&lt;", "<")
            .replaceAll("&gt;", ">");
          const isImg = content.match(/<img\s.+?>/g);
          const imgLink = isImg
            ? content
                .match(/<img\s.+?>/g)
                .find((item) => item.match(/(src=[\'"])(.+?)[\'"]/g))
                .match(/(src=[\'"])(.+?)[\'"]/g)[0]
                .replace(/(^src=['"]|['"]$)/g, "")
            : null;
          const regLink =
            /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

          const img = imgLink
            ? imgLink.match(regLink)
              ? imgLink
              : null
            : null;
          state.documents.push({
            title: item.ok.title.text,
            source: item.ok.source.name,
            attributes: [
              {
                name: "технические новости",
                isShow: item.ok.attributes.isTechNews,
              },
              {
                name: "анонсы и события",
                isShow: item.ok.attributes.isAnnouncement,
              },
              {
                name: "сводки новостей",
                isShow: item.ok.attributes.isDigest,
              },
            ],
            date: item.ok.issueDate,
            image: img,
            content: content
              .replace(/<img\s.+?>/g, "")
              .replace(/<svg\s.+?>/g, ""),
            link: item.ok.url,
            countWord: content
              .replace(regexTags, "")
              .length.toLocaleString("ru-RU"),
          });
        });
        state.statusDocuments = "success";
      })
      .addCase(fetchDocumentList.pending, (state) => {
        state.statusDocuments = "loading";
      })
      .addCase(fetchDocumentList.rejected, (state) => {
        state.statusDocuments = "error";
      });
  },
});

export default documentListSlice.reducer;
