import { Box, Typography, Link } from "@mui/material";
import { isValidUrl } from "../utils/validation";

const InfoBox = ({ info }: { info: any }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        margin: "0 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Info
      </Typography>
      {Object.keys(info).map((key) => {
        // @ts-ignore
        const field = info[key];
        if (Array.isArray(field)) {
          return;
        }
        return (
          <>
            {!isValidUrl(field) ? (
              <Typography variant="body1" gutterBottom>
                {field}
              </Typography>
            ) : (
              <Link href={field} gutterBottom>
                {field}
              </Link>
            )}
          </>
        );
      })}
    </Box>
  );
};

export default InfoBox;
