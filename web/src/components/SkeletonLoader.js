import React from 'react';
import { Skeleton, Box, Card, CardContent } from '@mui/material';

const TaskCardSkeleton = () => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="100%" height={24} sx={{ mt: 1 }} />
        <Skeleton variant="text" width="80%" height={24} />
        <Box display="flex" gap={1} mt={2}>
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="rounded" width={80} height={24} />
        </Box>
      </CardContent>
    </Card>
  );
};

const SkeletonLoader = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <TaskCardSkeleton key={index} />
      ))}
    </>
  );
};

export default SkeletonLoader;

